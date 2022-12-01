import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { getDesignTokens } from "../theme";

export const StyleThemeContext = createContext({ toggleColorMode: () => {} });

export const StyleThemeProvider = (
  props: PropsWithChildren<any>
): JSX.Element => {
  const defaultMode: PaletteMode =
    (localStorage.getItem("themePreference") as PaletteMode) || "dark";
  const [mode, setMode] = useState(defaultMode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          if (prevMode === "dark") {
            localStorage.setItem("themePreference", "light");
            return "light";
          } else {
            localStorage.setItem("themePreference", "dark");
            return "dark";
          }
        });
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const useTheme = createTheme(getDesignTokens(mode));
    return responsiveFontSizes(useTheme);
  }, [mode]);

  return (
    <StyleThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </StyleThemeContext.Provider>
  );
};

export const StyleThemeConsumer = StyleThemeContext.Consumer;
