import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  subject: string;
};

const Pointer011 = ({ subject }: Props) => {
  const [res, setRes] = useState<Pointer011ResponseType>(0);

  const [tw, setTw] = useState(0);
  const [practical, setPractical] = useState(0);

  useEffect(() => {
    const cal = tw + practical;
    let theoryG;

    if (cal >= 60) theoryG = 10;
    else if (cal >= 52.5) theoryG = 9;
    else if (cal >= 45) theoryG = 8;
    else if (cal >= 41.25) theoryG = 7;
    else if (cal >= 37.5) theoryG = 6;
    else if (cal >= 33.75) theoryG = 5;
    else if (cal >= 30) theoryG = 4;
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

export default Pointer011;

export type Pointer011ResponseType = number;
