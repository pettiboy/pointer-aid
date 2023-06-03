import { createContext, PropsWithChildren } from "react";

interface ContextValueType {
  addToAverage: (id: string, value: number, weight: number) => void;
  getPredictionFor: (id: string) => number;
  calculateCurrentAverage: () => number;
}

export const CgpaCalculatorContext = createContext<ContextValueType>(
  {} as ContextValueType
);

export const CgpaCalculatorProvider = (
  props: PropsWithChildren<any>
): JSX.Element => {
  const addToAverage = (id: string, value: number, weight: number) => {
    console.log(id, value, weight);
  };

  const getPredictionFor = (id: string) => {
    return 0;
  };

  const calculateCurrentAverage = () => {
    return 0;
  };

  return (
    <CgpaCalculatorContext.Provider
      value={{
        addToAverage,
        getPredictionFor,
        calculateCurrentAverage,
      }}
    >
      {props.children}
    </CgpaCalculatorContext.Provider>
  );
};

export const CgpaCalculatorConsumer = CgpaCalculatorContext.Consumer;
