import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  subject: string;
};

const Pointer300 = ({ subject }: Props) => {
  const [res, setRes] = useState<Pointer300ResponseType>(0);

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);
  const [ese, setEse] = useState(0);

  useEffect(() => {
    const cal = ise + ia + ese / 2;
    let theoryG;

    if (cal >= 80) theoryG = 10;
    else if (cal >= 70) theoryG = 9;
    else if (cal >= 60) theoryG = 8;
    else if (cal >= 55) theoryG = 7;
    else if (cal >= 50) theoryG = 6;
    else if (cal >= 45) theoryG = 5;
    else if (cal >= 40) theoryG = 4;
    else theoryG = 0;

    setRes(theoryG);
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
