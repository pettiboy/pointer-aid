import {
  Box,
  Typography,
  Grid,
  Paper,
  SxProps,
  CircularProgress,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import { Slider } from "@mui/material";
import pointerToMarks from "../../utils/pointerToMarks";
import pointerToMarksIseFixed from "../../utils/pointerToMarksIseFixed";
import pointerToMarksIseIaFixed from "../../utils/pointerToMarksIseIaFixed";
import round from "../../utils/round";
import { useParams } from "react-router-dom";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { TextField } from "../TextField/TextField";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";

type Props = {
  subject: string;
  subjectCode: string;
  onUpdateCallback(cg: number): void;
};

const fallbackDefaultValues: Pointer300LocalStorageType = {
  ise: 0,
  ia: 0,
  ese: 0,
  fixIa: false,
  fixIse: false,
  fallback: true,
};

const iseMaxMarks = 30;
const iaMaxMarks = 20;
const eseMaxMarks = 100;

const Pointer300 = ({ subject, subjectCode, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer300LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );

  const [res, setRes] = useState(9);

  const [loading, setLoading] = useState(true);

  const [ise, setIse] = useState(defaultValues.ise);
  const [ia, setIa] = useState(defaultValues.ia);
  const [ese, setEse] = useState(defaultValues.ese);

  const [fixIse, setFixIse] = useState(defaultValues.fixIse);
  const [fixIa, setFixIa] = useState(defaultValues.fixIa);

  const [showMinimize, setShowMinimize] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (defaultValues.fallback) {
      updateMarksGivenPointer(res);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 3);

    return () => {
      onUpdateCallback(0);
    };
  }, [res]);

  useEffect(() => {
    setRes(round(calculatePointer(ise + ia + ese / 2, 100)));
  }, [ise, ia, ese]);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        ise,
        ia,
        ese,
        fixIa,
        fixIse,
      })
    );
  }, [ise, ia, ese, fixIa, fixIse]);

  useEffect(() => {
    const addition = round(ia + ise + ese / 2);
    const total = round(iseMaxMarks + iaMaxMarks + eseMaxMarks / 2);
    const percentage = (addition / total) * 100;

    if (calculateMarksGivenPointer(res, 100) < percentage) {
      setTimeout(() => {
        setShowMinimize(true);
      }, 200);
    } else {
      setTimeout(() => {
        setShowMinimize(false);
      }, 200);
    }
  }, [ia, ise, ese, res]);

  const onChangeIseMarks = (num: number) => {
    setIse(num);
  };
  const onChangeIaMarks = (num: number) => {
    setIa(num);
  };
  const onChangeEseMarks = (num: number) => {
    setEse(num);
  };

  const onChangeFixIse = (checked: boolean) => {
    if (checked === false) setFixIa(false);
    setFixIse(checked);
  };
  const onChangeFixIa = (checked: boolean) => {
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
    <Paper className="pointer-paper-container">
      {!loading ? (
        <>
          <Box>
            <Typography sx={{ mb: 3 }} variant="h4">
              {subject}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"ISE"}
                  maxMarks={iseMaxMarks}
                  inputProps={{
                    value: ise.toString(),
                  }}
                  onChangeCallback={onChangeIseMarks}
                  lockedState={fixIse}
                  onLockStateChange={onChangeFixIse}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"IA"}
                  maxMarks={iaMaxMarks}
                  inputProps={{
                    value: ia.toString(),
                  }}
                  onChangeCallback={onChangeIaMarks}
                  lockedState={fixIa}
                  onLockStateChange={onChangeFixIa}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"ESE"}
                  maxMarks={eseMaxMarks}
                  inputProps={{
                    value: ese.toString(),
                  }}
                  onChangeCallback={onChangeEseMarks}
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

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };

export default Pointer300;
