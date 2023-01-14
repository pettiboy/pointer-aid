import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

type Props = {};

const IosInstallPrompt = (props: Props) => {
  const [promptToInstallIos, setPromptToInstallIos] = useState(false);

  const isIos = useCallback(() => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }, [navigator]);

  const isInstalledOnIos = useCallback(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return true;
    } else {
      return false;
    }
  }, [navigator]);

  const handleOpen = () => setPromptToInstallIos(true);
  const handleClose = () => setPromptToInstallIos(false);

  return isIos() && !isInstalledOnIos() ? (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Install
      </Button>

      <Dialog onClose={handleClose} open={promptToInstallIos}>
        <DialogTitle align="center">
          <Typography variant={"h4"}>Install Pointer Aid</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <List>
            <ListItem>
              <Typography>
                Open the{" "}
                <Box component="span" fontWeight={"bold"}>
                  Share menu
                </Box>
                , available at the bottom or top of the browser.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Click{" "}
                <Box component="span" fontWeight={"bold"}>
                  Add to Home Screen
                </Box>
                .
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Click{" "}
                <Box component="span" fontWeight={"bold"}>
                  Add
                </Box>
                .
              </Typography>
            </ListItem>
          </List>
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button onClick={handleClose} fullWidth autoFocus>
            okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : null;
};

export default IosInstallPrompt;
