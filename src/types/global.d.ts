declare global {
  interface StringNumberObject {
    [key: string]: number;
  }
  type OnChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement
  >;
}

export {};
