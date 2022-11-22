import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Grid,
  SxProps,
  Box,
  Slider,
  CircularProgress,
} from "@mui/material";
import round from "../../utils/round";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import calculatePointer from "../../utils/calculatePointer";
import { useParams } from "react-router-dom";

import asyncLocalStorage from "../../utils/asyncLocalStorage";

type Props = {
  subject: string;
  subjectCode: string;
  onUpdateCallback(cg: number): void;
};
const fallbackDefaultValues: Pointer020_50LocalStorageType = {
  tw: 0,
  fallback: false,
};

const Pointer020_50 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer020_50LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );
  const [loading, setLoading] = useState(true);
  const [tw, setTW] = useState<number>(defaultValues.tw);
  const [res, setRes] = useState(4);

  const totalMarks = 50;

  useEffect(() => {
    setLoading(true);
    if (defaultValues.fallback) {
      updateMarksGivenPointer(res);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw, totalMarks));
  }, [tw]);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        tw,
      })
    );
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
    <Paper className="pointer-paper-container">
      {!loading ? (
        <Box>
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
        </Box>
      ) : (
        <Box className="center-loader">
          <CircularProgress />
        </Box>
      )}
    </Paper>
  );
};

export default Pointer020_50;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
