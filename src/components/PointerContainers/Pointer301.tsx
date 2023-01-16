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
import { Slider } from "@mui/material";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import round from "../../utils/round";
import pointerToMarks from "../../utils/pointerToMarks";
import pointerToMarksIseFixed from "../../utils/pointerToMarksIseFixed";
import pointerToMarksIseIaFixed from "../../utils/pointerToMarksIseIaFixed";
import { useParams } from "react-router-dom";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { TextField } from "../TextField/TextField";

type Props = {
  subject: string;
  subjectCode: string;
  onUpdateCallback(th: number, tw: number): void;
};

const fallbackDefaultValues: Pointer301LocalStorageType = {
  ise: 0,
  ia: 0,
  ese: 0,
  fixIa: false,
  fixIse: false,
  fallback: true,
  tw: 0,
};

const iseMaxMarks = 30;
const iaMaxMarks = 20;
const eseMaxMarks = 100;

const twMaxMarks = 25;

const Pointer301 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer301LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );
  const [theoryRes, setTheoryRes] = useState(9);
  const [termWorkRes, setTermWorkRes] = useState(9);
  const [loading, setLoading] = useState(true);

  const [ise, setIse] = useState(defaultValues.ise);
  const [ia, setIa] = useState(defaultValues.ia);
  const [ese, setEse] = useState(defaultValues.ese);
  const [tw, setTw] = useState(defaultValues.tw);

  const [fixIse, setFixIse] = useState(defaultValues.fixIse);
  const [fixIa, setFixIa] = useState(defaultValues.fixIa);

  const [showMinimizeTheory, setShowMinimizeTheory] = useState(false);
  const [showMinimizeTw, setShowMinimizeTw] = useState(false);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        ise,
        ia,
        ese,
        fixIa,
        fixIse,
        tw,
      })
    );
  }, [ise, ia, ese, fixIa, fixIse, tw]);

  useEffect(() => {
    setLoading(true);
    if (defaultValues.fallback) {
      updateMarksGivenPointer(theoryRes);
      handleTWMarksChange(termWorkRes);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // * 1 is just for readability purpose
    onUpdateCallback(theoryRes * 3, termWorkRes * 1);

    return () => {
      onUpdateCallback(0, 0);
    };
  }, [theoryRes, termWorkRes]);

  useEffect(() => {
    setTheoryRes(round(calculatePointer(ise + ia + ese / 2, 100)));
  }, [ise, ia, ese]);

  useEffect(() => {
    const addition = round(ia + ise + ese / 2);
    const total = round(iseMaxMarks + iaMaxMarks + eseMaxMarks / 2);
    const percentage = (addition / total) * 100;

    if (calculateMarksGivenPointer(theoryRes, 100) < percentage) {
      setTimeout(() => {
        setShowMinimizeTheory(true);
      }, 200);
    } else {
      setTimeout(() => {
        setShowMinimizeTheory(false);
      }, 200);
    }
  }, [ia, ise, ese, theoryRes]);

  useEffect(() => {
    const addition = round(tw);
    const percentage = (addition / twMaxMarks) * 100;

    if (calculateMarksGivenPointer(termWorkRes, 100) < percentage) {
      setTimeout(() => {
        setShowMinimizeTw(true);
      }, 200);
    } else {
      setTimeout(() => {
        setShowMinimizeTw(false);
      }, 200);
    }
  }, [tw, termWorkRes]);

  useEffect(() => {
    setTermWorkRes(calculatePointer(tw, twMaxMarks));
  }, [tw]);

  const handleTWMarksChange = (num: number) => {
    setTw(round(calculateMarksGivenPointer(num, twMaxMarks)));
  };

  const onChangeIseMarks = (num: number) => {
    setIse(round(Number(num)));
  };
  const onChangeIaMarks = (num: number) => {
    setIa(round(Number(num)));
  };
  const onChangeEseMarks = (num: number) => {
    setEse(round(Number(num)));
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
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"TW"}
                  maxMarks={twMaxMarks}
                  inputProps={{
                    value: tw.toString(),
                  }}
                  onChangeCallback={(e) => setTw(Number(e))}
                />
              </Grid>
            </Grid>
          </Box>
          <Grid container xs={12}>
            <Grid item xs={6} sx={{ px: 1 }}>
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
                />
                <Button
                  onClick={() => {
                    updateMarksGivenPointer(theoryRes);
                  }}
                  variant={!showMinimizeTheory ? "outlined" : "contained"}
                  disabled={!showMinimizeTheory}
                  fullWidth
                >
                  Minimize Marks
                </Button>
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
                />
                <Button
                  onClick={() => {
                    handleTWMarksChange(Number(termWorkRes));
                  }}
                  variant={!showMinimizeTw ? "outlined" : "contained"}
                  disabled={!showMinimizeTw}
                  fullWidth
                >
                  Minimize Marks
                </Button>
              </Box>
            </Grid>
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

export default Pointer301;
const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };

export interface Pointer301ResponseType {
  tw: number;
  theory: number;
}
