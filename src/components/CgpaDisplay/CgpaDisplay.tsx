import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

type Props = {
  cgpa: number | null;
};

const CgpaDisplay = ({ cgpa }: Props) => {
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
        >
          {cgpa ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* actual value */}
              <Typography variant="h4">CGPA: {cgpa}</Typography>
            </Box>
          ) : (
            // loading indicator
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">CGPA: </Typography>
              <CircularProgress size={20} sx={{ ml: 1.2 }} />
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default CgpaDisplay;
