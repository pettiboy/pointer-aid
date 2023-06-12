import { Box, Paper } from "@mui/material";
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
      sx={{
        p: 1.5,
        position: "fixed",
        zIndex: 1,
        width: "100%",
        // when key board is open on smaller screens
        // should adjust to directly on top of keyboard
        // because CgpaDisplay is not visible
        bottom: isKeyboardOpen ? 0 : "12%",
        left: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* this calls the cgpa target component 
            to handle the actual logic */}
        <CgpaTarget />
      </Box>
    </Paper>
  ) : (
    <></>
  );
};

export default CgpaTargetContainer;
