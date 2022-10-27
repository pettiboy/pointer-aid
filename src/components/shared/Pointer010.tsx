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

  const [fixTw, setFixTw] = useState(false);
  const [fixPrac, setFixPrac] = useState(false);

  const [tw, setTw] = useState(0);
  const [practical, setPractical] = useState(0);

  useEffect(() => {
    updateMarksGivenPointer(res);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 1);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw + practical, 50));
  }, [tw, practical]);

  const pointerToMarksFixed = (pointer: number, fixVal: number) => {
    const totalReq = calculateMarksGivenPointer(pointer, 50) - fixVal;
    return round(totalReq);
  };

  const updateMarksGivenPointer = (num: number) => {
    if (fixTw) {
      setPractical(pointerToMarksFixed(num, tw));
    } else if (fixPrac) {
      setTw(pointerToMarksFixed(num, practical));
    } else {
      setPractical(round(calculateMarksGivenPointer(num, 25)));
      setTw(round(calculateMarksGivenPointer(num, 25)));
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

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ mb: 3 }} variant="h4">
          {subject}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={gridItemStyle}>
            <TextField
              label="TW"
              value={tw.toString()}
              onChange={(e) => setTw(Number(e.target.value))}
              type="number"
              sx={{ mr: 2, mb: 2 }}
            />
            <FormControlLabel
              control={<Switch checked={fixTw} onChange={onChangeFixTw} />}
              label="Fix TW marks"
            />
          </Grid>
          <Grid item xs={12} md={6} sx={gridItemStyle}>
            <TextField
              label="practical/oral"
              value={practical.toString()}
              onChange={(e) => setPractical(Number(e.target.value))}
              type="number"
              sx={{ mr: 2, mb: 2 }}
            />
            <FormControlLabel
              control={<Switch checked={fixPrac} onChange={onChangeFixPrac} />}
              label="Fix Practical marks"
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
