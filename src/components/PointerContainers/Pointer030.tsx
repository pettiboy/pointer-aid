import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  SxProps,
  Box,
  Slider,
  CircularProgress,
} from "@mui/material";
import round from "../../utils/round";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import calculatePointer from "../../utils/calculatePointer";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { useParams } from "react-router-dom";
import { TextField } from "../TextField/TextField";

type Props = {
  subject: string;
  subjectCode: string;

  onUpdateCallback(cg: number): void;
};

const fallbackDefaultValues: Pointer030LocalStorageType = {
  tw: 0,
  fallback: true,
};

const Pointer030 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();

  const defaultValues: Pointer030LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );
  const [loading, setLoading] = useState(true);

  const [tw, setTW] = useState<Number>(defaultValues.tw);
  const [res, setRes] = useState(9);

  const onChangeTWMarks = (num: number) => {
    setRes(round(calculatePointer(Number(num), 50)));
    setTW(round(Number(num)));
  };

  useEffect(() => {
    setRes(round(calculatePointer(Number(tw), 50)));
  }, [tw]);
  useEffect(() => {
    setLoading(true);
    if (defaultValues.fallback) {
      setTW(round(calculateMarksGivenPointer(Number(res), 50)));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        tw,
      })
    );
  }, [tw]);

  useEffect(() => {
    onUpdateCallback(res * 3);

    return () => {
      onUpdateCallback(0);
    };
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
    <Paper className="pointer-paper-container">
      {!loading ? (
        <>
          <Box>
            <Typography sx={{ mb: 3 }} variant="h4">
              {subject}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={gridItemStyle}>
                <TextField
                  label={"TW"}
                  inputProps={{
                    value: tw.toString(),
                  }}
                  onChangeCallback={onChangeTWMarks}
                  maxMarks={50}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <Box>
              <Typography>Grade Pointer (G): {res}</Typography>
              <Slider
                min={4}
                step={1}
                max={10}
                value={res}
                onChange={onChangeSlider}
              />
            </Box>
          </Grid>
        </>
      ) : (
        <Box className="center-loader">
          <CircularProgress />
        </Box>
      )}
    </Paper>
  );
};

export default Pointer030;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
