import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import HideOetOehm from "../HideOetOehm/HideOetOehm";

type Props = {
  pointer: number | null;
};

const PointerDisplay = ({ pointer }: Props) => {
  const isKeyboardOpen = useDetectKeyboardOpen();

  return (
    <>
      {!isKeyboardOpen && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100vw",
            px: 3,
            py: 2,
            zIndex: 9,
          }}
          elevation={5}
        >
          {pointer ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* actual value */}
              <Typography variant="h4">Pointer: {pointer}</Typography>
              <HideOetOehm />
            </Box>
          ) : (
            // loading indicator
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Pointer: </Typography>
              <CircularProgress size={20} sx={{ ml: 1.2 }} />
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default PointerDisplay;
