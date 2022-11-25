import {
  createTheme,
  CssBaseline,
  PaletteMode,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar/Appbar";
import ColorModeContext from "./context/ColorModeContext";
import { useTracking } from "./hooks/useTracking";
import router from "./router";
import { getDesignTokens } from "./theme";

function App() {
  useTracking();

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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Appbar />

        <Routes>
          {router.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
