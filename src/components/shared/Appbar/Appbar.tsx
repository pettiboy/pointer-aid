import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import { useContext } from "react";
import ColorModeContext from "../../../context/ColorModeContext";

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
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img
            src={
              process.env.PUBLIC_URL + "/favicons/android-chrome-512x512.png"
            }
            alt=""
            width={30}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              ml: 2,
            }}
          >
            Pointer Aid
          </Typography>
        </Box>
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
