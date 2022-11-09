import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import ColorModeContext from "../../../../context/ColorModeContext";

type Props = {};

const Appbar = (props: Props) => {
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        zIndex: "1400",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Pointer Calculator
        </Typography>
        <IconButton
          sx={{ ml: "auto" }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
