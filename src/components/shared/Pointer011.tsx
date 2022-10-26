import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import calculateMarks from '../../utils/calculateMarks'
import {Slider} from '@mui/material'

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
};

const Pointer011 = ({ subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(0);

  const [tw, setTw] = useState(0);
  const [practical, setPractical] = useState(0);

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw + practical, 75));
  }, [tw, practical]);

  const handleMarksChange=(num:number)=>{
    const temp=calculateMarks(num,75);
    const newValue=temp-tw
    setPractical(newValue)
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <TextField
        label="TW"
        value={tw.toString()}
        onChange={(e) => setTw(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="practical/oral"
        value={practical.toString()}
        onChange={(e) => setPractical(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />

      <Box>
        <Typography>Grade Pointer (G): {res}</Typography>
        <Slider
					sx={{ width: "80vw" }}
					min={4}
					step={1}
					max={10}
					value={res}
					onChange={(e, num) => {
						handleMarksChange(Number(num));
					}}
					defaultValue={9}
				/>
      </Box>
    </Box>
  );
};

export default Pointer011;
