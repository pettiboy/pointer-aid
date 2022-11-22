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

  interface Pointer301LocalStorageType extends PointerIseIaEse {
    tw: number;
  }
  interface Pointer300LocalStorageType extends PointerIseIaEse {}
  interface Pointer200LocalStorageType extends PointerIseIa {}
  interface Pointer110_50LocalStorageType extends PointerTw {}
  interface Pointer110_75LocalStorageType extends PointerTwPractical {}
  interface Pointer102LocalStorageType extends PointerIseIaEse {}
  interface Pointer030LocalStorageType extends PointerTw {}
  interface Pointer020LocalStorageType extends PointerTwPractical {}
  interface Pointer020_50LocalStorageType extends PointerTw {}
  interface Pointer012LocalStorageType extends PointerTwPractical {}
  interface Pointer011LocalStorageType extends PointerTwPractical {}
  interface Pointer010LocalStorageType extends PointerTwPractical {}
}

interface PointerIseIa {
  ise: number;
  ia: number;
  fixIse: boolean;
  fixIa: boolean;
  fallback?: boolean;
}

interface PointerIseIaEse extends PointerIseIa {
  ese: number;
}

interface PointerTwPractical {
  tw: number;
  practical: number;
  fixTw: boolean;
  fixPrac: boolean;
  fallback?: boolean;
}

interface PointerTw {
  tw: number;
  fallback?: boolean;
}

export {};
