import {
  Box,
  Typography,
  TextField,
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

  const [res, setRes] = useState(4);
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

  const onChangeFixTw = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === true) setFixPrac(false);
    setFixTw(checked);
  };
  const onChangeFixPrac = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === true) setFixTw(false);
    setFixPrac(checked);
  };

  const onChangeTwMarks = (e: OnChangeEvent) => {
    setTw(round(Number(e.target.value)));
  };
  const onChangePracticalMarks = (e: OnChangeEvent) => {
    setPractical(round(Number(e.target.value)));
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
                  label="TW"
                  helperText={`max marks - ${twMaxMarks}`}
                  value={tw === 0 ? "" : tw.toString()}
                  onChange={onChangeTwMarks}
                  type="number"
                />
                <FormControlLabel
                  control={<Switch checked={fixTw} onChange={onChangeFixTw} />}
                  label="Fix TW marks"
                />
              </Grid>

              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label="practical/oral"
                  helperText={`max marks - ${oralMaxMarks}`}
                  value={practical === 0 ? "" : practical.toString()}
                  onChange={onChangePracticalMarks}
                  type="number"
                />
                <FormControlLabel
                  control={
                    <Switch checked={fixPrac} onChange={onChangeFixPrac} />
                  }
                  label="Fix Practical marks"
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

export default Pointer110_75;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
