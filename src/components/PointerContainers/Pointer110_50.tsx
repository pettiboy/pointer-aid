import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  SxProps,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import calculateMarksGivenPointer from "../../utils/calculateMarksGivenPointer";
import { Slider } from "@mui/material";
import round from "../../utils/round";
import {useParams} from 'react-router-dom'
import asyncLocalStorage from '../../utils/asyncLocalStorage'

type Props = {
  subject: string;
  subjectCode:string;
  onUpdateCallback(cg: number): void;
};



const fallbackDefaultValues: Pointer110_50LocalStorageType = {
  tw: 0,
};


const Pointer110_50 = ({subjectCode, subject, onUpdateCallback }: Props) => {


  const { college, branch, semester } = useParams();
  const defaultValues: Pointer110_50LocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${semester}_${subjectCode}`) ||
      JSON.stringify(fallbackDefaultValues)
  );

  const [res, setRes] = useState(4);

  const [tw, setTw] = useState(defaultValues.tw);

  const twMaxMarks = 50;
  const totalMaxMarks = twMaxMarks;

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_${subjectCode}`,
      JSON.stringify({
        tw
      })
    );
  }, [tw]);
  useEffect(() => {
    updateMarksGivenPointer(res);
  }, []);

  useEffect(() => {
    onUpdateCallback(res * 2);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(tw, totalMaxMarks));
  }, [tw]);

  const updateMarksGivenPointer = (pointer: number) => {
    setTw(round(calculateMarksGivenPointer(pointer, twMaxMarks)));
  };

  const onChangeTwMarks = (e: OnChangeEvent) => {
    setTw(round(Number(e.target.value)));
  };

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    updateMarksGivenPointer(value as number);
  };

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={gridItemStyle}>
          <TextField
            label="TW"
            helperText={`max marks - ${twMaxMarks}`}
            value={tw === 0 ? "" : tw.toString()}
            onChange={onChangeTwMarks}
            type="number"
            fullWidth
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

export default Pointer110_50;

const gridItemStyle: SxProps = { display: "flex", flexDirection: "column" };
