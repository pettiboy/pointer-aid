import { Palette } from "@mui/material";

export const getDesignTokens = (mode: Palette["mode"]) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: { main: "#b241ff" },
          background: { default: "#FFFFFF", paper: "#F7F6F3" },
        }
      : {
          // palette values for dark mode
          primary: { main: "#b241ff" },
          background: { default: "#2F3437", paper: "#373C3F" },
        }),
  },
});
