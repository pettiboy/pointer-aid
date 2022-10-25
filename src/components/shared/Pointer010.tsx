import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";

type Props = {
  subject: string;
};

const Pointer010 = ({ subject }: Props) => {
  const [res, setRes] = useState(0);

  const [tw, setTw] = useState(0);
  const [practical, setPractical] = useState(0);

  useEffect(() => {
    setRes(calculatePointer(tw + practical, 50));
  }, [tw, practical]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <TextField
        label="TW"
        value={tw}
        onChange={(e) => setTw(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="practical/oral"
        value={practical}
        onChange={(e) => setPractical(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />

      <Box>
        <Typography>Grade Pointer (G): {res}</Typography>
      </Box>
    </Box>
  );
};

export default Pointer010;
