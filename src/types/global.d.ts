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

  interface Pointer301LocalStorageType {
    ise: number;
    ia: number;
    ese: number;
    fixIse: boolean;
    fixIa: boolean;
    fallback?: boolean;
    tw: number;
  }

  interface Pointer300LocalStorageType {
    ise: number;
    ia: number;
    ese: number;
    fixIse: boolean;
    fixIa: boolean;
    fallback?: boolean;
  }

  interface Pointer200LocalStorageType {
    ise: number;
    ia: number;
    fixIse: boolean;
    fixIa: boolean;
    fallback?: boolean;
  }

  interface Pointer110_75LocalStorageType {
    tw: number;
    practical: number;
    fixTw: boolean;
    fixPrac: boolean;
    fallback?: boolean;
  }

  interface Pointer110_50LocalStorageType {
    tw: number;
    fallback?: boolean;
  }

  interface Pointer102LocalStorageType {
    ise: number;
    ia: number;
    ese: number;
    fixIse: boolean;
    fixIa: boolean;
    fallback?: boolean;
  }
  interface Pointer030LocalStorageType {
    tw: number;
    fallback?: boolean;
  }
  interface Pointer020LocalStorageType {
    tw: number;
    practical: number;
    fixTw: boolean;
    fixPrac: boolean;
    fallback?: boolean;
  }
  interface Pointer020_50LocalStorageType {
    tw: number;
    fallback?: boolean;
  }
  interface Pointer012LocalStorageType {
    tw: number;
    practical: number;
    fixTw: boolean;
    fixPrac: boolean;
    fallback?: boolean;
  }
  interface Pointer011LocalStorageType {
    tw: number;
    practical: number;
    fixTw: boolean;
    fixPrac: boolean;
    fallback?: boolean;
  }
  interface Pointer010LocalStorageType {
    tw: number;
    practical: number;
    fixTw: boolean;
    fixPrac: boolean;
    fallback?: boolean;
  }
}

export {};
