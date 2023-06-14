import { Box, Grid, Paper } from "@mui/material";
import useWindowDimensions from "../../../../hooks/useWindowDimentions";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import CgpaTarget from "../CgpaTarget";

type Props = {};

const CgpaTargetContainer = (props: Props) => {
  const isKeyboardOpen = useDetectKeyboardOpen();
  const { width } = useWindowDimensions();

  // show only for small screens
  return width < 700 ? (
    <Paper
      className="sgpa-paper-container"
      sx={{
        pb: 1,
      }}
    >
      <CgpaTarget />
    </Paper>
  ) : (
    <></>
  );
};

export default CgpaTargetContainer;
