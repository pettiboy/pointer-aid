import { Box, Paper, Typography } from "@mui/material";

type Props = {
  pointer: number;
};

const PointerDisplay = ({ pointer }: Props) => {
  return (
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
  );
};

export default PointerDisplay;
