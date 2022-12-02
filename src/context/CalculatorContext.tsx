import React, { useEffect } from "react";

import { useState, createContext, PropsWithChildren } from "react";

interface ContextValueType {
  // setter to fetch calculator data
  setCalculatorData: React.Dispatch<
    React.SetStateAction<CalculatorDataStateType>
  >;

  // use this calculator data
  filteredCalculatorData: CalculatorDataStateType;

  //
  setDisableSubjectIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CalculatorContext = createContext<ContextValueType>(
  {} as ContextValueType
);

export const CalculatorProvider = (
  props: PropsWithChildren<any>
): JSX.Element => {
  const [calculatorData, setCalculatorData] =
    useState<CalculatorDataStateType>(null);
  const [filteredCalculatorData, setFilteredCalculatorData] =
    useState<CalculatorDataStateType>(null);

  const [disableSubjectIds, setDisableSubjectIds] = useState<string[]>([]);

  useEffect(() => {
    setFilteredCalculatorData(calculatorData);
  }, [calculatorData]);

  useEffect(() => {
    setFilteredCalculatorData(() => {
      const updatedCalcData: CalculatorDataStateType = [];
      calculatorData?.forEach((subject) => {
        if (!disableSubjectIds.includes(subject.subjectCode)) {
          console.log("here");
          updatedCalcData.push(subject);
        }
      });
      return updatedCalcData;
    });
  }, [disableSubjectIds]);

  return (
    <CalculatorContext.Provider
      value={{
        setCalculatorData,
        filteredCalculatorData,
        setDisableSubjectIds,
      }}
    >
      {props.children}
    </CalculatorContext.Provider>
  );
};

export const CalculatorConsumer = CalculatorContext.Consumer;

type CalculatorDataStateType = PointerCalculatorStructureType[] | null;
