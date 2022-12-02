import React, { useEffect } from "react";

import { useState, createContext, PropsWithChildren } from "react";

interface ContextValueType {
  calculatorData: CalculatorDataStateType;
  // setter to fetch calculator data
  setCalculatorData: React.Dispatch<
    React.SetStateAction<CalculatorDataStateType>
  >;

  // use this data to render calculator on screen
  filteredCalculatorData: CalculatorDataStateType;

  // setter to update disableSubjectIds
  // disableSubjectIds are not included in filteredCalculatorData
  setDisableSubjectIds: React.Dispatch<
    React.SetStateAction<DisabledSubjectIdsStateType>
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
  const [filteredCalculatorData, setFilteredCalculatorData] =
    useState<CalculatorDataStateType>(null);

  const [disableSubjectIds, setDisableSubjectIds] =
    useState<DisabledSubjectIdsStateType>([]);

  useEffect(() => {
    setFilteredCalculatorData(calculatorData);
  }, [calculatorData]);

  useEffect(() => {
    setFilteredCalculatorData(() => {
      const updatedCalcData: CalculatorDataStateType = [];
      calculatorData?.forEach((subject) => {
        if (!disableSubjectIds.includes(subject.subjectCode)) {
          updatedCalcData.push(subject);
        }
      });
      return updatedCalcData;
    });
  }, [disableSubjectIds]);

  return (
    <CalculatorContext.Provider
      value={{
        calculatorData,
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
type DisabledSubjectIdsStateType = string[];
