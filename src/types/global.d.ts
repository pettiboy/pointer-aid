declare global {
  interface StringNumberObject {
    [key: string]: number;
  }

  type OnChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement
  >;

  type PointerCalculatorStructureType = {
    subjectName: string;
    subjectCode: string;
    creditDistribution: string;
  };
}

export {};
