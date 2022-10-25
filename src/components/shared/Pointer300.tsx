import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
};

const Pointer300 = ({ subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(0);

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);
  const [ese, setEse] = useState(0);

  useEffect(() => {
    onUpdateCallback(res * 3);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(ise + ia + ese / 2, 100));
  }, [ise, ia, ese]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <TextField
        label="ISE"
        value={ise.toString()}
        onChange={(e) => setIse(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="IA"
        value={ia.toString()}
        onChange={(e) => setIa(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="ESE"
        value={ese.toString()}
        onChange={(e) => setEse(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />

      <Box>
        <Typography>Grade Pointer (G): {res}</Typography>
      </Box>
    </Box>
  );
};

export default Pointer300;
