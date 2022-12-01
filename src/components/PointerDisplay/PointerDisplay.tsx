import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

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
            p: 3,
            zIndex: 9,
          }}
        >
          {pointer ? (
            // actual value
            <Typography variant="h4">Pointer: {pointer}</Typography>
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
