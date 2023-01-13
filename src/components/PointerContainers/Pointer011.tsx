import {
  Box,
  Typography,
  Paper,
  Grid,
  SxProps,
  FormControlLabel,
  Switch,
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

const fallbackDefaultValues: Pointer011LocalStorageType = {
  tw: 0,
  practical: 0,
  fixTw: false,
  fixPrac: false,
  fallback: true,
};

const Pointer011 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(4);
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer011LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );

  const [fixTw, setFixTw] = useState(defaultValues.fixTw);
  const [fixPrac, setFixPrac] = useState(defaultValues.fixPrac);
  const [tw, setTw] = useState(defaultValues.tw);
  const [practical, setPractical] = useState(defaultValues.practical);

  const [loading, setLoading] = useState(true);

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
                  maxMarks={50}
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
                  label={"practical/oral"}
                  maxMarks={25}
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
            <Box>
              <Typography>Grade Pointer (G): {res}</Typography>
              <Slider
                min={4}
                step={1}
                max={10}
                value={res}
                onChange={(e, num) => {
                  updateMarksGivenPointer(Number(num));
                }}
                defaultValue={9}
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

export default Pointer011;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
