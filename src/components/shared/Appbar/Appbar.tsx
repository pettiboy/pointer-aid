import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
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
            Pointer Calculator
          </Typography>
        </Box>
        <IconButton
          sx={{ ml: "auto" }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeIcon />
          ) : (
          <LightModeIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
