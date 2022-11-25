import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ColorModeContext from "../../context/ColorModeContext";
import { useNavigate } from "react-router-dom";
import { useAddToHomescreenPrompt } from "../../hooks/useAddToHomescreenPrompt";

type Props = {};

const Appbar = (props: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);

  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  useEffect(() => {
    if (prompt) {
      setIsPromptVisible(true);
    }
  }, [prompt]);

  const onClick = () => {
    navigate("/");
  };

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
          onClick={onClick}
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
        <Box sx={{ ml: "auto" }}>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          {isPromptVisible && (
            <Button variant="contained" onClick={promptToInstall}>
              Install
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
