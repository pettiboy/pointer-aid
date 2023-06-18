import { Key } from "react";
import { Path } from "react-router-dom";

declare global {
  type StatusType = "loading" | "loaded" | "no_data" | "error";

  type DisableSubjectStateType = "present" | "show" | "hide";

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
    structureType?: "b";
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
  interface GpaLocalStorageType extends SGPA {}

  interface CgpaCalculatorStructureType {
    semesterId: string;
    semesterName: string;
    maxCredits: number;
    warningText?: string;
    supportsOet?: boolean;
    supportsOehm?: boolean;
  }

  /**
   * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
   * before a user is prompted to "install" a web site to a home screen on mobile.
   *
   */
  interface BeforeInstallPromptEvent extends Event {
    /**
     * Returns an array of DOMString items containing the platforms on which the event was dispatched.
     * This is provided for user agents that want to present a choice of versions to the user such as,
     * for example, "web" or "play" which would allow the user to chose between a web version or
     * an Android version.
     */
    readonly platforms: Array<string>;

    /**
     * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
     */
    readonly userChoice: Promise<{
      outcome: "accepted" | "dismissed";
      platform: string;
    }>;

    /**
     * Allows a developer to show the install prompt at a time of their own choosing.
     * This method returns a Promise.
     */
    prompt(): Promise<void>;
  }
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
interface SGPA {
  value: string;
  fix: boolean;
}

export {};
