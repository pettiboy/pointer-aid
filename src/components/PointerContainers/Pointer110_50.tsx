import {
  Box,
  Typography,
  Paper,
  Grid,
  SxProps,
  CircularProgress,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import { Slider } from "@mui/material";
import round from "../../utils/round";
import { useParams } from "react-router-dom";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { TextField } from "../TextField/TextField";

type Props = {
  subject: string;
  subjectCode: string;
  onUpdateCallback(cg: number): void;
};

const fallbackDefaultValues: Pointer110_50LocalStorageType = {
  tw: 0,
  fallback: true,
};

const Pointer110_50 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer110_50LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );

  const [res, setRes] = useState(9);

  const [tw, setTw] = useState(defaultValues.tw);
  const [loading, setLoading] = useState(true);

  const [showMinimize, setShowMinimize] = useState(false);

  const twMaxMarks = 50;
  const totalMaxMarks = twMaxMarks;

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        tw,
      })
    );
  }, [tw]);
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
    const addition = round(tw);
    const percentage = (addition / totalMaxMarks) * 100;

    if (calculateMarksGivenPointer(res, 100) < percentage) {
      setTimeout(() => {
        setShowMinimize(true);
      }, 200);
    } else {
      setTimeout(() => {
        setShowMinimize(false);
      }, 200);
    }
  }, [tw, res]);

  const updateMarksGivenPointer = (pointer: number) => {
    setTw(round(calculateMarksGivenPointer(pointer, twMaxMarks)));
  };

  const onChangeTwMarks = (num: number) => {
    setTw(round(Number(num)));
  };

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    updateMarksGivenPointer(value as number);
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
                  maxMarks={twMaxMarks}
                  inputProps={{
                    value: tw.toString(),
                  }}
                  onChangeCallback={onChangeTwMarks}
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
              variant={!showMinimize ? "outlined" : "contained"}
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

export default Pointer110_50;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
