import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";

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
    setRes({
      theory: calculatePointer(ise + ia + ese / 2, 100),
      tw: res.tw,
    });
  }, [ise, ia, ese]);

  useEffect(() => {
    setRes({
      theory: res.theory,
      tw: calculatePointer(tw, 25),
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
