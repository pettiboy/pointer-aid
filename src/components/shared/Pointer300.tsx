import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";

type Props = {
  subject: string;
};

const Pointer300 = ({ subject }: Props) => {
  const [res, setRes] = useState<Pointer300ResponseType>(0);

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);
  const [ese, setEse] = useState(0);

  useEffect(() => {
    setRes(calculatePointer(ise + ia + ese / 2, 100));
  }, [ise, ia, ese]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ mb: 3 }}>{subject}</Typography>
      <TextField
        label="ISE"
        value={ise}
        onChange={(e) => setIse(Number(e.target.value))}
        type="number"
      />
      <TextField
        label="IA"
        value={ia}
        onChange={(e) => setIa(Number(e.target.value))}
        type="number"
      />
      <TextField
        label="ESE"
        value={ese}
        onChange={(e) => setEse(Number(e.target.value))}
        type="number"
      />

      <Box>
        <Typography sx={{ my: 2 }}>Theory</Typography>
        <Typography>Grade Pointer (G): {res}</Typography>
        <Typography>Credits (C): {3}</Typography>
      </Box>
    </Box>
  );
};

export default Pointer300;

export type Pointer300ResponseType = number;
