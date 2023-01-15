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
import { useCallback, useContext, useEffect, useState } from "react";
import { StyleThemeContext } from "../../context/StyleThemeContext";
import { useNavigate } from "react-router-dom";
import { useAddToHomescreenPrompt } from "../../hooks/useAddToHomescreenPrompt";
import ShopIcon from "@mui/icons-material/Shop";
import IosInstallPrompt from "./IosInstallPrompt/IosInstallPrompt";

type Props = {};

const Appbar = (props: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { toggleColorMode } = useContext(StyleThemeContext);

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

  const isAndroid = useCallback(
    () => /Android/i.test(navigator.userAgent),
    [navigator]
  );

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
          <IconButton onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>

          {/* check if app does not already exist on users device */}
          {isPromptVisible &&
            // if android device link to play store
            (isAndroid() ? (
              <Button
                variant="contained"
                startIcon={<ShopIcon />}
                onClick={() => {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.pettiboy.pointer_aid.twa",
                    "_blank"
                  );
                }}
              >
                Install
              </Button>
            ) : (
              // else prompt to install PWA (for other devices)
              <Button variant="contained" onClick={promptToInstall}>
                Install
              </Button>
            ))}

          {/* for iOS devices */}
          <IosInstallPrompt />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
