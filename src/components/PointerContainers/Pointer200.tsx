import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  SxProps,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import { Slider } from "@mui/material";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import round from "../../utils/round";

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
};

const Pointer010 = ({ subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(4);

  const [fixIse, setFixIse] = useState(false);
  const [fixIA, setFixIA] = useState(false);

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);

  const iseMaxMarks = 30;
  const iaMaxMarks = 20;
  const totalMarks = iseMaxMarks + iaMaxMarks;

  useEffect(() => {
    updateMarksGivenPointer(res);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(ise + ia, totalMarks));
  }, [ise, ia]);

  const updateMarksGivenPointer = (num: number) => {
    if (fixIse) {
      setIa(round(calculateMarksGivenPointer(num, totalMarks)) - ise);
    } else if (fixIA) {
      setIse(round(calculateMarksGivenPointer(num, totalMarks)) - ia);
    } else {
      setIa(round(calculateMarksGivenPointer(num, iaMaxMarks)));
      setIse(round(calculateMarksGivenPointer(num, iseMaxMarks)));
    }
  };

  const onChangefixIse = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === true) setFixIA(false);
    setFixIse(checked);
  };
  const onChangefixIA = (_e: OnChangeEvent, checked: boolean) => {
    if (checked === true) setFixIse(false);
    setFixIA(checked);
  };

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="ISE"
            helperText={`max marks - ${iseMaxMarks}`}
            value={ise.toString()}
            onChange={(e) => setIse(Number(e.target.value))}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixIse} onChange={onChangefixIse} />}
            label="Fix ISE marks"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={gridItemStyle}>
          <TextField
            label="IA"
            helperText={`max marks - ${iaMaxMarks}`}
            value={ia.toString()}
            onChange={(e) => setIa(Number(e.target.value))}
            type="number"
          />
          <FormControlLabel
            control={<Switch checked={fixIA} onChange={onChangefixIA} />}
            label="Fix IA marks"
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
              onChange={(_e, num) => {
                updateMarksGivenPointer(Number(num));
              }}
              defaultValue={9}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Pointer010;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
