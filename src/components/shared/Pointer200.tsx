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

  useEffect(() => {
    updateMarksGivenPointer(res);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(ise + ia, 50));
  }, [ise, ia]);

  const updateMarksGivenPointer = (num: number) => {
    if (fixIse) {
      setIa(round(calculateMarksGivenPointer(num, 50)) - ise);
    } else if (fixIA) {
      setIse(round(calculateMarksGivenPointer(num, 50)) - ia);
    } else {
      setIa(round(calculateMarksGivenPointer(num, 20)));
      setIse(round(calculateMarksGivenPointer(num, 30)));
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
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ mb: 3 }} variant="h4">
          {subject}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={gridItemStyle}>
            <TextField
              label="ISE"
              value={ise.toString()}
              onChange={(e) => setIse(Number(e.target.value))}
              type="number"
              sx={{ mr: 2, mb: 2 }}
            />
            <FormControlLabel
              control={<Switch checked={fixIse} onChange={onChangefixIse} />}
              label="Fix ISE marks"
            />
          </Grid>
          <Grid item xs={12} md={6} sx={gridItemStyle}>
            <TextField
              label="IA"
              value={ia.toString()}
              onChange={(e) => setIa(Number(e.target.value))}
              type="number"
              sx={{ mr: 2, mb: 2 }}
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
      </Box>
    </Paper>
  );
};

export default Pointer010;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
