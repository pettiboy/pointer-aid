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

const Pointer020 = ({ subject, onUpdateCallback }: Props) => {
  const [tw, setTW] = useState<Number>(0);
  const [res, setRes] = useState(4);

  const onChangeTWMarks = (e: OnChangeEvent) => {
    setRes(round(calculatePointer(Number(e.target.value), 50)));

    setTW(round(Number(e.target.value)));
  };

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    setTW(round(calculateMarksGivenPointer(Number(value), 50)));

    setRes(Number(value));
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
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

export default Pointer020;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
