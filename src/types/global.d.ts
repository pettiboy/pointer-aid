import { Key } from "react";
import { Path } from "react-router-dom";

declare global {
  type StatusType = "loading" | "loaded" | "no_data" | "error";

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
    maxMarks?: 50 | 75 | 100;
  };

  interface RouterLocation extends Path {
    state: unknown;
    key: Key;
  }
}

export {};
