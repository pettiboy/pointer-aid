import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  SxProps,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import { Slider } from "@mui/material";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import round from "../../utils/round";
import pointerToMarks from "../../utils/pointerToMarks";
import pointerToMarksIseFixed from "../../utils/pointerToMarksIseFixed";
import pointerToMarksIseIaFixed from "../../utils/pointerToMarksIseIaFixed";

type Props = {
  subject: string;
  onUpdateCallback(th: number, tw: number): void;
};

const Pointer301 = ({ subject, onUpdateCallback }: Props) => {
  const [theoryRes, setTheoryRes] = useState(4);
  const [termWorkRes, setTermWorkRes] = useState(4);

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);
  const [ese, setEse] = useState(0);
  const [tw, setTw] = useState(0);

  const [fixIse, setFixIse] = useState(false);
  const [fixIa, setFixIa] = useState(false);

  useEffect(() => {
    updateMarksGivenPointer(theoryRes);
    handleTWMarksChange(termWorkRes);
  }, []);

  useEffect(() => {
    // * 1 is just for readability purpose
    onUpdateCallback(theoryRes * 3, termWorkRes * 1);
  }, [theoryRes, termWorkRes]);

  useEffect(() => {
    setTheoryRes(round(calculatePointer(ise + ia + ese / 2, 100)));
  }, [ise, ia, ese]);

  useEffect(() => {
    setTermWorkRes(calculatePointer(tw, 25));
  }, [tw]);

  const handleTWMarksChange = (num: number) => {
    setTw(round(calculateMarksGivenPointer(num, 25)));
  };

  const onChangeIseMarks = (e: OnChangeEvent) => {
    setIse(round(Number(e.target.value)));
  };
  const onChangeIaMarks = (e: OnChangeEvent) => {
    setIa(round(Number(e.target.value)));
  };
  const onChangeEseMarks = (e: OnChangeEvent) => {
    setEse(round(Number(e.target.value)));
  };

  const onChangeFixIse = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === false) setFixIa(false);
    setFixIse(checked);
  };
  const onChangeFixIa = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === true) setFixIse(true);
    setFixIa(checked);
  };

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    updateMarksGivenPointer(value as number);
  };

  const updateMarksGivenPointer = (pointer: number) => {
    if (fixIse === true && fixIa === true) {
      updateMarksIseIaFixed(pointer);
    } else if (fixIse === true) {
      updateMarksIseFixed(pointer);
    } else {
      updateMarks(pointer);
    }
  };

  const updateMarks = (pointer: number) => {
    const marks = pointerToMarks(pointer);
    setEse(round(marks.ese));
    setIa(round(marks.ia));
    setIse(round(marks.ise));
  };

  const updateMarksIseFixed = (pointer: number) => {
    const marks = pointerToMarksIseFixed(pointer, ise);
    setEse(round(marks.ese));
    setIa(round(marks.ia));
  };

  const updateMarksIseIaFixed = (pointer: number) => {
    const marks = pointerToMarksIseIaFixed(pointer, ise, ia);
    setEse(round(marks.ese));
  };

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="ISE"
            helperText="max marks - 30"
            value={ise.toString()}
            onChange={onChangeIseMarks}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixIse} onChange={onChangeFixIse} />}
            label="Fix ISE marks"
          />
        </Grid>

        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="IA"
            helperText="max marks - 20"
            value={ia.toString()}
            onChange={onChangeIaMarks}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixIa} onChange={onChangeFixIa} />}
            label="Fix IA marks"
          />
        </Grid>

        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="ESE"
            helperText="max marks - 100"
            value={ese.toString()}
            onChange={onChangeEseMarks}
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="TW"
            helperText="max marks - 25"
            value={tw.toString()}
            onChange={(e) => setTw(Number(e.target.value))}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
              Theory
            </Typography>
            <Typography>Grade Pointer (G): {theoryRes}</Typography>
            <Slider
              min={4}
              step={1}
              max={10}
              value={theoryRes}
              onChange={onChangeSlider}
              defaultValue={9}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
              Term Work
            </Typography>
            <Typography>Grade Pointer (G): {termWorkRes}</Typography>
            <Slider
              min={4}
              step={1}
              max={10}
              value={termWorkRes}
              onChange={(e, num) => {
                handleTWMarksChange(Number(num));
              }}
              defaultValue={9}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Pointer301;
const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };

export interface Pointer301ResponseType {
  tw: number;
  theory: number;
}
