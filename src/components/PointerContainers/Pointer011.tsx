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

const fallbackDefaultValues: Pointer011LocalStorageType = {
  tw: 0,
  practical: 0,
  fixTw: false,
  fixPrac: false,
  fallback: true,
};

const twMaxMarks = 50;
const practicalMaxMarks = 25;
const totalMaxMarks = twMaxMarks + practicalMaxMarks;

const Pointer011 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(9);
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer011LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );
  const [loading, setLoading] = useState(true);

  const [fixTw, setFixTw] = useState(defaultValues.fixTw);
  const [fixPrac, setFixPrac] = useState(defaultValues.fixPrac);
  const [tw, setTw] = useState(defaultValues.tw);
  const [practical, setPractical] = useState(defaultValues.practical);

  const [showMinimize, setShowMinimize] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (defaultValues.fallback) {
      updateMarksGivenPointer(res);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        tw,
        practical,
        fixTw,
        fixPrac,
      })
    );
  }, [tw, practical, fixTw, fixPrac]);

  useEffect(() => {
    onUpdateCallback(res * 2);

    return () => {
      onUpdateCallback(0);
    };
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw + practical, 75));
  }, [tw, practical]);

  useEffect(() => {
    const addition = round(tw + practical);
    const percentage = (addition / totalMaxMarks) * 100;

    if (calculateMarksGivenPointer(res, 100) < percentage) {
      setShowMinimize(true);
    } else {
      setShowMinimize(false);
    }
  }, [tw, practical, res]);

  const updateMarksGivenPointer = (pointer: number) => {
    if (fixTw) {
      setPractical(calculateMarksGivenPointer(pointer, 75) - tw);
    } else if (fixPrac) {
      setTw(round(calculateMarksGivenPointer(pointer, 75) - practical));
    } else {
      setPractical(round(calculateMarksGivenPointer(pointer, 25)));
      setTw(round(calculateMarksGivenPointer(pointer, 50)));
    }
  };

  const onChangeFixTw = (checked: boolean) => {
    if (checked === true) setFixPrac(false);
    setFixTw(checked);
  };
  const onChangeFixPrac = (checked: boolean) => {
    if (checked === true) setFixTw(false);
    setFixPrac(checked);
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
                  label={"TW"}
                  maxMarks={twMaxMarks}
                  inputProps={{
                    value: tw.toString(),
                  }}
                  onChangeCallback={setTw}
                  lockedState={fixTw}
                  onLockStateChange={onChangeFixTw}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"Practical / Viva"}
                  maxMarks={practicalMaxMarks}
                  inputProps={{
                    value: practical.toString(),
                  }}
                  onChangeCallback={setPractical}
                  onLockStateChange={onChangeFixPrac}
                  lockedState={fixPrac}
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
                onChange={(e, num) => {
                  updateMarksGivenPointer(Number(num));
                }}
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

export default Pointer011;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
