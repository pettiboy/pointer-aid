import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  SxProps,
  Box,
  Slider,
} from "@mui/material";
import round from "../../utils/round";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import calculatePointer from "../../utils/calculatePointer";

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
};

const Pointer020_50 = ({ subject, onUpdateCallback }: Props) => {
  const [tw, setTW] = useState<number>(0);
  const [res, setRes] = useState(4);

  const totalMarks = 50;

  useEffect(() => {
    updateMarksGivenPointer(res);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw, totalMarks));
  }, [tw]);

  const updateMarksGivenPointer = (num: number) => {
    setTW(round(calculateMarksGivenPointer(Number(num), totalMarks)));
  };

  const onChangeTWMarks = (e: OnChangeEvent) => {
    setRes(round(calculatePointer(Number(e.target.value), totalMarks)));

    setTW(round(Number(e.target.value)));
  };

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    updateMarksGivenPointer(Number(value));
  };

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={gridItemStyle}>
          <TextField
            label="Term Work"
            helperText="max marks - 50"
            value={tw.toString()}
            onChange={onChangeTWMarks}
            type="number"
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

export default Pointer020_50;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
