import { Paper, Typography } from "@mui/material";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

type Props = {
  pointer: number;
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
          <Typography variant="h4">Pointer: {pointer}</Typography>
        </Paper>
      )}
    </>
  );
};

export default PointerDisplay;
