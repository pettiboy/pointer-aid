import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Grid,
  Paper,
  SxProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import { Slider } from "@mui/material";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
};

const Pointer300 = ({ subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(4);

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);
  const [ese, setEse] = useState(0);

  const [fixIse, setFixIse] = useState(false);
  const [fixIa, setFixIa] = useState(false);

  useEffect(() => {
    updateMarksGivenPointer(res);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 3);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(ise + ia + ese / 2, 100));
  }, [ise, ia, ese]);

  const onChangeIseMarks = (e: OnChangeEvent) => {
    setIse(Number(e.target.value));
  };
  const onChangeIaMarks = (e: OnChangeEvent) => {
    setIa(Number(e.target.value));
  };
  const onChangeEseMarks = (e: OnChangeEvent) => {
    setEse(Number(e.target.value));
  };

  const onChangeFixIse = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === false) setFixIa(false);
    setFixIse(checked);
  };
  const onChangeFixIa = (_e: OnChangeEvent, checked: boolean) => {
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
    let totalReq = calculateMarksGivenPointer(pointer, 100);

    let eseMarksLimit = calculateMarksGivenPointer(pointer, 50);
    let iaMarksLimit = calculateMarksGivenPointer(pointer, 20);
    let iseMarksLimit = calculateMarksGivenPointer(pointer, 30);

    let updateEse = 0;
    let updateIa = 0;
    let updateIse = 0;

    if (totalReq > eseMarksLimit) {
      // set ese to max limit
      updateEse += eseMarksLimit * 2;

      // pass on req to lower exams
      totalReq = totalReq - eseMarksLimit;

      if (totalReq > iaMarksLimit) {
        // set ia to max limit
        updateIa += iaMarksLimit;
        // pass on req to lower exams
        totalReq = totalReq - iaMarksLimit;

        if (totalReq > iseMarksLimit) {
          updateIse += iseMarksLimit;
        } else {
          updateIse += totalReq;
        }
      } else {
        updateIa += totalReq;
        updateIse += 0;
      }
    } else {
      updateEse += totalReq * 2;
      updateIa += 0;
      updateIse += 0;
    }

    setEse(updateEse);
    setIa(updateIa);
    setIse(updateIse);
  };

  const updateMarksIseFixed = (pointer: number) => {
    let totalReq = calculateMarksGivenPointer(pointer, 100) - ise;
    let eseMarksLimit = calculateMarksGivenPointer(pointer, 50);
    let iaMarksLimit = calculateMarksGivenPointer(pointer, 20);

    let updateEse = 0;
    let updateIa = 0;

    let count = 0;

    while (totalReq > 0 && count < 5) {
      if (totalReq > eseMarksLimit) {
        // set updateEse to max limit
        updateEse += eseMarksLimit * 2;

        // pass on req to lower exams
        totalReq = totalReq - eseMarksLimit;

        if (totalReq > iaMarksLimit) {
          // set ia to existing limit
          updateIa += iaMarksLimit;

          // pass on req to next iteration with higher limits
          totalReq = totalReq - iaMarksLimit;

          // maximise limits
          eseMarksLimit = Math.abs(50 - updateEse / 2);
          iaMarksLimit = Math.abs(20 - updateIa);
        } else {
          updateIa += totalReq;

          break;
        }
      } else {
        updateEse += totalReq * 2;
        updateIa += 0;

        break;
      }

      count++;
    }

    setEse(updateEse);
    setIa(updateIa);
  };

  const updateMarksIseIaFixed = (pointer: number) => {
    let totalReq = calculateMarksGivenPointer(pointer, 100) - ise - ia;
    let eseMarksLimit = calculateMarksGivenPointer(pointer, 50);

    let updateEse = 0;

    let count = 0;

    while (totalReq > 0 && count < 5) {
      if (totalReq > eseMarksLimit) {
        // set updateEse to existing limit
        updateEse += eseMarksLimit * 2;

        // pass on req to next iteration with higher limits
        totalReq = totalReq - eseMarksLimit;

        // maximise limits
        eseMarksLimit = Math.abs(50 - updateEse / 2);
      } else {
        updateEse += totalReq * 2;

        break;
      }

      count++;
    }

    setEse(updateEse);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="ISE"
            helperText="max marks - 30"
            value={ise.toString()}
            onChange={onChangeIseMarks}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixIse} onChange={onChangeFixIse} />}
            label="Fix ISE marks"
          />
        </Grid>

        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="IA"
            helperText="max marks - 20"
            value={ia.toString()}
            onChange={onChangeIaMarks}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixIa} onChange={onChangeFixIa} />}
            label="Fix IA marks"
          />
        </Grid>

        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="ESE"
            helperText="max marks - 100"
            value={ese.toString()}
            onChange={onChangeEseMarks}
            type="number"
          />
        </Grid>

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
      </Grid>
    </Paper>
  );
};

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };

export default Pointer300;
