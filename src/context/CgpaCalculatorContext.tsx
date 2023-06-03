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
  getPredictionFor: (id: string) => number;
  calculateCurrentAverage: () => number;

  refreshAverageCount: number;
}

export const CgpaCalculatorContext = createContext<ContextValueType>(
  {} as ContextValueType
);

export const CgpaCalculatorProvider = (
  props: PropsWithChildren<any>
): JSX.Element => {
  const [sgpaList, setSgpaList] = useState<SgpaListType>([]);

  const [refreshAverageCount, setRefreshAverageCount] = useState<number>(0);

  const addToAverage = (
    id: string,
    value: number,
    weight: number,
    isLocked: boolean,

    noRefreshAverage: boolean = false
  ) => {
    console.log("request to add to average for: ", id, value, weight, isLocked);

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

  const getPredictionFor = (id: string) => {
    return 0;
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

        refreshAverageCount,
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
