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
import { useParams } from "react-router-dom";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { TextField } from "../TextField/TextField";

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
  subjectCode: string;
  maxMarks?: PointerCalculatorStructureType["maxMarks"];
};

const fallbackDefaultValues: Pointer020LocalStorageType = {
  tw: 0,
  practical: 0,
  fixTw: false,
  fixPrac: false,
  fallback: true,
};

const Pointer020_75 = ({
  subjectCode,
  subject,
  onUpdateCallback,
  maxMarks,
}: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer020LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );
  const [res, setRes] = useState(9);
  const [loading, setLoading] = useState(true);

  const [fixTw, setFixTw] = useState(defaultValues.fixTw);
  const [fixPrac, setFixPrac] = useState(defaultValues.fixPrac);

  const [tw, setTw] = useState(defaultValues.tw);
  const [practical, setPractical] = useState(defaultValues.practical);

  const twMaxMarks = maxMarks === 100 ? 50 : 25;
  const practicalMaxMarks = 50;
  const totalMaxMarks = twMaxMarks + practicalMaxMarks;

  const [showMinimize, setShowMinimize] = useState(false);

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

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        tw,
        practical,
        fixPrac,
        fixTw,
      })
    );
  }, [tw, practical, fixPrac, fixTw]);

  useEffect(() => {
    const addition = round(tw + practical);
    const percentage = (addition / totalMaxMarks) * 100;

    if (calculateMarksGivenPointer(res, 100) < percentage) {
      setShowMinimize(true);
    } else {
      setShowMinimize(false);
    }
  }, [tw, practical, res]);

  const pointerToMarksFixed = (pointer: number, fixVal: number) => {
    const totalReq =
      calculateMarksGivenPointer(pointer, totalMaxMarks) - fixVal;
    return round(totalReq);
  };

  const updateMarksGivenPointer = (num: number) => {
    if (fixTw) {
      setPractical(pointerToMarksFixed(num, tw));
    } else if (fixPrac) {
      setTw(pointerToMarksFixed(num, practical));
    } else {
      setPractical(round(calculateMarksGivenPointer(num, practicalMaxMarks)));
      setTw(round(calculateMarksGivenPointer(num, twMaxMarks)));
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
                onChange={(_e, num) => {
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

export default Pointer020_75;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
