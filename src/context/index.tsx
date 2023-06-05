import { PropsWithChildren } from "react";
import { CalculatorProvider } from "./CalculatorContext";
import { StyleThemeProvider } from "./StyleThemeContext";
import { CgpaCalculatorProvider } from "./CgpaCalculatorContext";

// Order is important
const providers = [
  StyleThemeProvider,
  CalculatorProvider,
  CgpaCalculatorProvider,
];

const GlobalContextProviders = (props: PropsWithChildren<any>) => {
  function providersBuilder(i: number) {
    if (i >= providers.length) return props.children;
    const CurrentProvider = providers[i];
    return <CurrentProvider>{providersBuilder(i + 1)}</CurrentProvider>;
  }

  return <>{providersBuilder(0)}</>;
};

export default GlobalContextProviders;
