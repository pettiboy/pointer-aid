import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  subject: string;
};

const Pointer301 = ({ subject }: Props) => {
  const [res, setRes] = useState<Pointer301ResponseType>({
    tw: 10,
    theory: 10,
  });

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);
  const [ese, setEse] = useState(0);
  const [tw, setTw] = useState(0);

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

    setRes({
      theory: theoryG,
      tw: res.tw,
    });
  }, [ise, ia, ese]);

  useEffect(() => {
    const cal = tw;
    let twG;

    if (cal >= 20) twG = 10;
    else if (cal >= 17.5) twG = 9;
    else if (cal >= 15) twG = 8;
    else if (cal >= 13.75) twG = 7;
    else if (cal >= 12.5) twG = 6;
    else if (cal >= 11.25) twG = 5;
    else if (cal >= 10) twG = 4;
    else twG = 0;

    setRes({
      theory: res.theory,
      tw: twG,
    });
  }, [tw]);

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
      <TextField
        label="TW"
        value={tw}
        onChange={(e) => setTw(Number(e.target.value))}
        type="number"
      />

      <Box>
        <Typography sx={{ my: 2 }}>Theory</Typography>
        <Typography>Grade Pointer (G): {res.theory}</Typography>
        <Typography>Credits (C): {3}</Typography>
      </Box>
      <Box>
        <Typography sx={{ my: 2 }}>Term Work</Typography>
        <Typography>Grade Pointer (G): {res.tw}</Typography>
        <Typography>Credits (C): {1}</Typography>
      </Box>
    </Box>
  );
};

export default Pointer301;

export interface Pointer301ResponseType {
  tw: number;
  theory: number;
}
