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
import { Slider } from "@mui/material";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import round from "../../utils/round";
import { useParams } from "react-router-dom";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { TextField } from "../TextField/TextField";

type Props = {
  subject: string;
  subjectCode: string;
  onUpdateCallback(cg: number): void;
};

const fallbackDefaultValues: Pointer200LocalStorageType = {
  ise: 0,
  ia: 0,
  fixIa: false,
  fixIse: false,
  fallback: true,
};

const Pointer200 = ({ subjectCode, subject, onUpdateCallback }: Props) => {
  const { college, branch, semester } = useParams();
  const defaultValues: Pointer200LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );
  const [res, setRes] = useState(9);
  const [loading, setLoading] = useState(true);

  const [fixIse, setFixIse] = useState(defaultValues.fixIse);
  const [fixIa, setFixIa] = useState(defaultValues.fixIa);

  const [ise, setIse] = useState(defaultValues.ise);
  const [ia, setIa] = useState(defaultValues.ia);

  const iseMaxMarks = 30;
  const iaMaxMarks = 20;
  const totalMarks = iseMaxMarks + iaMaxMarks;

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        ise,
        ia,
        fixIa,
        fixIse,
      })
    );
  }, [ise, ia, fixIa, fixIse]);

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
    setRes(calculatePointer(ise + ia, totalMarks));
  }, [ise, ia]);

  const updateMarksGivenPointer = (num: number) => {
    if (fixIse) {
      setIa(round(calculateMarksGivenPointer(num, totalMarks)) - ise);
    } else if (fixIa) {
      setIse(round(calculateMarksGivenPointer(num, totalMarks)) - ia);
    } else {
      setIa(round(calculateMarksGivenPointer(num, iaMaxMarks)));
      setIse(round(calculateMarksGivenPointer(num, iseMaxMarks)));
    }
  };

  const onChangeFixIse = (checked: boolean) => {
    if (checked === true) setFixIa(false);
    setFixIse(checked);
  };
  const onChangeFixIa = (checked: boolean) => {
    if (checked === true) setFixIse(false);
    setFixIa(checked);
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
                  maxMarks={30}
                  inputProps={{
                    value: ise.toString(),
                  }}
                  onChangeCallback={setIse}
                  lockedState={fixIse}
                  onLockStateChange={onChangeFixIse}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={gridItemStyle}>
                <TextField
                  label={"IA"}
                  maxMarks={20}
                  inputProps={{
                    value: ia.toString(),
                  }}
                  onChangeCallback={setIa}
                  lockedState={fixIa}
                  onLockStateChange={onChangeFixIa}
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
                onChange={(_e, num) => {
                  updateMarksGivenPointer(Number(num));
                }}
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

export default Pointer200;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
