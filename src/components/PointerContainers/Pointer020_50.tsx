import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  SxProps,
  Box,
  Slider,
  CircularProgress,
  Button,
} from "@mui/material";
import round from "../../utils/round";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import calculatePointer from "../../utils/calculatePointer";
import { useParams } from "react-router-dom";
import { TextField } from "../TextField/TextField";
import asyncLocalStorage from "../../utils/asyncLocalStorage";

type Props = {
  subject: string;
  subjectCode: string;
  onUpdateCallback(cg: number): void;
};

const fallbackDefaultValues: Pointer020_50LocalStorageType = {
  tw: 0,
  fallback: true,
};

const Pointer020_50 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer020_50LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );
  const [loading, setLoading] = useState(true);
  const [tw, setTW] = useState<number>(defaultValues.tw);
  const [res, setRes] = useState(9);

  const [showMinimize, setShowMinimize] = useState(false);

  const totalMaxMarks = 50;

  useEffect(() => {
    setLoading(true);
    if (defaultValues.fallback) {
      updateMarksGivenPointer(res);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 2);

    return () => {
      onUpdateCallback(0);
    };
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw, totalMaxMarks));
  }, [tw]);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        tw,
      })
    );
  }, [tw]);

  useEffect(() => {
    const addition = round(tw);
    const percentage = (addition / totalMaxMarks) * 100;

    if (calculateMarksGivenPointer(res, 100) < percentage) {
      setShowMinimize(true);
    } else {
      setShowMinimize(false);
    }
  }, [tw, res]);

  const updateMarksGivenPointer = (num: number) => {
    setTW(round(calculateMarksGivenPointer(Number(num), totalMaxMarks)));
  };

  const onChangeTWMarks = (num: number) => {
    setRes(round(calculatePointer(Number(num), totalMaxMarks)));

    setTW(round(Number(num)));
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
        <>
          <Box>
            <Typography sx={{ mb: 3 }} variant="h4">
              {subject}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={gridItemStyle}>
                <TextField
                  label={"TW"}
                  maxMarks={50}
                  inputProps={{
                    value: tw.toString(),
                  }}
                  onChangeCallback={onChangeTWMarks}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
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
          <Grid item xs={12}>
            <Button
              onClick={() => {
                updateMarksGivenPointer(res);
              }}
              variant="outlined"
              disabled={!showMinimize}
              fullWidth
            >
              Minimize Marks
            </Button>
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

export default Pointer020_50;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
