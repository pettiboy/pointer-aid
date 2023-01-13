import {
  Box,
  Typography,
  Paper,
  Grid,
  SxProps,
  CircularProgress,
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

const fallbackDefaultValues: Pointer110_75LocalStorageType = {
  tw: 0,
  practical: 0,
  fixTw: false,
  fixPrac: false,
  fallback: true,
};

const Pointer110_75 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer110_75LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );

  const [res, setRes] = useState(9);
  const [loading, setLoading] = useState(true);

  const [fixTw, setFixTw] = useState(defaultValues.fixTw);
  const [fixPrac, setFixPrac] = useState(defaultValues.fixPrac);
  const [tw, setTw] = useState(defaultValues.tw);
  const [practical, setPractical] = useState(defaultValues.practical);

  const twMaxMarks = 50;
  const oralMaxMarks = 25;
  const totalMaxMarks = twMaxMarks + oralMaxMarks;

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
    setRes(calculatePointer(tw + practical, totalMaxMarks));
  }, [tw, practical]);

  const updateMarksGivenPointer = (pointer: number) => {
    if (fixTw) {
      setPractical(calculateMarksGivenPointer(pointer, totalMaxMarks) - tw);
    } else if (fixPrac) {
      setTw(
        round(calculateMarksGivenPointer(pointer, totalMaxMarks) - practical)
      );
    } else {
      setPractical(round(calculateMarksGivenPointer(pointer, oralMaxMarks)));
      setTw(round(calculateMarksGivenPointer(pointer, twMaxMarks)));
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

  const onChangeTwMarks = (num: number) => {
    setTw(round(Number(num)));
  };
  const onChangePracticalMarks = (num: number) => {
    setPractical(round(Number(num)));
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
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"TW"}
                  maxMarks={twMaxMarks}
                  inputProps={{
                    value: tw.toString(),
                  }}
                  onChangeCallback={onChangeTwMarks}
                  lockedState={fixTw}
                  onLockStateChange={onChangeFixTw}
                />
              </Grid>

              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"Practical / Viva"}
                  maxMarks={oralMaxMarks}
                  inputProps={{
                    value: practical.toString(),
                  }}
                  onChangeCallback={onChangePracticalMarks}
                  lockedState={fixPrac}
                  onLockStateChange={onChangeFixPrac}
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
        </>
      ) : (
        <Box className="center-loader">
          <CircularProgress />
        </Box>
      )}
    </Paper>
  );
};

export default Pointer110_75;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
