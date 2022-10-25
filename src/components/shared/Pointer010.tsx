import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  subject: string;
};

const Pointer010 = ({ subject }: Props) => {
  const [res, setRes] = useState<Pointer010ResponseType>(0);

  const [tw, setTw] = useState(0);
  const [practical, setPractical] = useState(0);

  useEffect(() => {
    const cal = tw + practical;
    let theoryG;

    if (cal >= 40) theoryG = 10;
    else if (cal >= 35) theoryG = 9;
    else if (cal >= 30) theoryG = 8;
    else if (cal >= 27.5) theoryG = 7;
    else if (cal >= 25) theoryG = 6;
    else if (cal >= 22.5) theoryG = 5;
    else if (cal >= 20) theoryG = 4;
    else theoryG = 0;

    setRes(theoryG);
  }, [tw, practical]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ mb: 3 }}>{subject}</Typography>
      <TextField
        label="TW"
        value={tw}
        onChange={(e) => setTw(Number(e.target.value))}
        type="number"
      />
      <TextField
        label="practical/oral"
        value={practical}
        onChange={(e) => setPractical(Number(e.target.value))}
        type="number"
      />

      <Box>
        <Typography sx={{ my: 2 }}>Theory</Typography>
        <Typography>Grade Pointer (G): {res}</Typography>
        <Typography>Credits (C): {2}</Typography>
      </Box>
    </Box>
  );
};

export default Pointer010;

export type Pointer010ResponseType = number;
