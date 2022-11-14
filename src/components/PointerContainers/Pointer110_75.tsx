import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  SxProps,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import { Slider } from "@mui/material";
import round from "../../utils/round";

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
};

const Pointer110_75 = ({ subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(4);

  const [fixTw, setFixTw] = useState(false);
  const [fixPrac, setFixPrac] = useState(false);
  const [tw, setTw] = useState(0);
  const [practical, setPractical] = useState(0);

  const twMaxMarks = 50;
  const oralMaxMarks = 25;
  const totalMaxMarks = twMaxMarks + oralMaxMarks;

  useEffect(() => {
    updateMarksGivenPointer(res);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw + practical, totalMaxMarks));
  }, [tw, practical]);

  const updateMarksGivenPointer = (pointer: number) => {
    if (fixTw) {
      setPractical(calculateMarksGivenPointer(pointer, totalMaxMarks) - tw);
    } else if (fixPrac) {
      setTw(
        round(calculateMarksGivenPointer(pointer, totalMaxMarks) - practical)
      );
    } else {
      setPractical(round(calculateMarksGivenPointer(pointer, oralMaxMarks)));
      setTw(round(calculateMarksGivenPointer(pointer, twMaxMarks)));
    }
  };

  const onChangeFixTw = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === true) setFixPrac(false);
    setFixTw(checked);
  };
  const onChangeFixPrac = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === true) setFixTw(false);
    setFixPrac(checked);
  };

  const onChangeTwMarks = (e: OnChangeEvent) => {
    setTw(round(Number(e.target.value)));
  };
  const onChangePracticalMarks = (e: OnChangeEvent) => {
    setPractical(round(Number(e.target.value)));
  };

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    updateMarksGivenPointer(value as number);
  };

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="TW"
            helperText={`max marks - ${twMaxMarks}`}
            value={tw === 0 ? "" : tw.toString()}
            onChange={onChangeTwMarks}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixTw} onChange={onChangeFixTw} />}
            label="Fix TW marks"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="practical/oral"
            helperText={`max marks - ${oralMaxMarks}`}
            value={practical === 0 ? "" : practical.toString()}
            onChange={onChangePracticalMarks}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixPrac} onChange={onChangeFixPrac} />}
            label="Fix Practical marks"
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography>Grade Pointer (G): {res}</Typography>
            <Slider
              min={4}
              step={1}
              max={10}
              value={res}
              onChange={onChangeSlider}
              defaultValue={9}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Pointer110_75;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
