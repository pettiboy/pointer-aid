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

  const [tw, setTW] = useState<number>(defaultValues.tw);
  const [res, setRes] = useState(9);

  const [showMinimize, setShowMinimize] = useState(false);

  const totalMaxMarks = 50;

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

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    updateMarksGivenPointer(Number(value));

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
                  maxMarks={totalMaxMarks}
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

export default Pointer030;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
