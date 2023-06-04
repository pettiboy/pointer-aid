import { createContext, PropsWithChildren, useState } from "react";
import round from "../utils/round";

interface ContextValueType {
  addToAverage: (
    id: string,
    value: number,
    weight: number,
    isLocked: boolean, // pass the state of the lock switch in the sgpa container
    noRefreshAverage?: boolean // pass true to prevent refresh of average in UI
  ) => void;
  getPredictionFor: (id: string) => number; // should be called after calculatePredictions
  calculateCurrentAverage: () => number;
  calculateAndRefreshPredictions: (desiredResult: number) => void;

  refreshAverageCount: number;

  refreshRequestPrediction: number;
}

export const CgpaCalculatorContext = createContext<ContextValueType>(
  {} as ContextValueType
);

export const CgpaCalculatorProvider = (
  props: PropsWithChildren<any>
): JSX.Element => {
  // private states
  const [sgpaList, setSgpaList] = useState<SgpaListType>([]);
  const [predictions, setPredictions] = useState<Record<
    string,
    number
  > | null>();

  // public states
  const [refreshAverageCount, setRefreshAverageCount] = useState<number>(0);
  const [refreshRequestPrediction, setRefreshRequestPrediction] =
    useState<number>(0);

  const addToAverage = (
    id: string,
    value: number,
    weight: number,
    isLocked: boolean,

    noRefreshAverage: boolean = false
  ) => {
    setSgpaList((prevSgpaList) => {
      // add or create entry in sgpa list
      let newSgpaList = [...prevSgpaList];
      let found = false;
      newSgpaList.forEach((sgpa) => {
        if (sgpa.id === id) {
          sgpa.value = value;
          sgpa.weight = weight;
          sgpa.isLocked = isLocked;
          found = true;
        }
      });
      if (!found) {
        newSgpaList.push({
          id: id,
          value: value,
          weight: weight,
          isLocked: isLocked,
        });
      }

      return newSgpaList;
    });

    if (!noRefreshAverage) setRefreshAverageCount((prev) => prev + 1);
  };

  // calculate predictions
  // and request refresh of predictions
  const calculateAndRefreshPredictions = (desiredResult: number) => {
    let newPredictions: Record<string, number> = {};

    // x = ((goal * total_credits) - ab_tak_ka_weights_x_value) / remaing_weights_ka_sum
    let totalCredits = 0;
    let abTakKaWeightsXValue = 0;
    let remainingWeightsKaSum = 0;

    console.log("sgpaList: ", sgpaList);

    sgpaList.forEach((sgpa) => {
      totalCredits += sgpa.weight;
      if (!sgpa.isLocked) {
        remainingWeightsKaSum += sgpa.weight;
      } else {
        abTakKaWeightsXValue += sgpa.weight * sgpa.value;
      }
    });

    console.log(totalCredits, abTakKaWeightsXValue, remainingWeightsKaSum);

    let x =
      (desiredResult * totalCredits - abTakKaWeightsXValue) /
      remainingWeightsKaSum;

    sgpaList.forEach((sgpa) => {
      if (!sgpa.isLocked) {
        newPredictions[sgpa.id] = round(x, 2);
      }
    });

    setPredictions(newPredictions);
    setRefreshRequestPrediction((prev) => prev + 1);
  };

  const getPredictionFor = (id: string) => {
    if (predictions && id in predictions) {
      return predictions[id];
    } else {
      return -1;
    }
  };

  const calculateCurrentAverage = () => {
    let totalWeight = 0;
    let totalValue = 0;
    sgpaList.forEach((sgpa) => {
      totalWeight += sgpa.weight;
      totalValue += sgpa.value * sgpa.weight;
    });

    return round(round(totalValue, 2) / totalWeight, 2);
  };

  return (
    <CgpaCalculatorContext.Provider
      value={{
        addToAverage,
        getPredictionFor,
        calculateCurrentAverage,
        calculateAndRefreshPredictions,

        refreshAverageCount,
        refreshRequestPrediction,
      }}
    >
      {props.children}
    </CgpaCalculatorContext.Provider>
  );
};

export const CgpaCalculatorConsumer = CgpaCalculatorContext.Consumer;

type SgpaListType = {
  id: string;
  value: number;
  weight: number;
  isLocked: boolean;
}[];
