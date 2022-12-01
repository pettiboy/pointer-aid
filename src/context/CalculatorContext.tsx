import React from "react";

import { useState, createContext, PropsWithChildren } from "react";

interface ContextValueType {
  calculatorData: CalculatorDataStateType;
  setCalculatorData: React.Dispatch<
    React.SetStateAction<CalculatorDataStateType>
  >;
}

export const CalculatorContext = createContext<ContextValueType>(
  {} as ContextValueType
);

export const CalculatorProvider = (
  props: PropsWithChildren<any>
): JSX.Element => {
  const [calculatorData, setCalculatorData] =
    useState<CalculatorDataStateType>(null);

  return (
    <CalculatorContext.Provider
      value={{
        calculatorData,
        setCalculatorData,
      }}
    >
      {props.children}
    </CalculatorContext.Provider>
  );
};

export const CalculatorConsumer = CalculatorContext.Consumer;

type CalculatorDataStateType = PointerCalculatorStructureType[] | null;
