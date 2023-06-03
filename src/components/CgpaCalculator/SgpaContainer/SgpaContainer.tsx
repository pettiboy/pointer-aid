import { Paper, Typography, Box, Slider } from "@mui/material";
import { useState } from "react";
import SgpaTextField from "../SgpaTextField/SgpaTextField";

type Props = {
  title: string;
  weightage: number;

  onUpdateCallback(cg: number): void;
};

const SgpaContainer = (props: Props) => {
  const [value, setValue] = useState<string>("9.0");

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    setValue(((value as number) / 10).toString());
  };

  return (
    <Paper className="pointer-paper-container">
      <Typography sx={{ mb: 2 }} variant="h4">
        Semester 1
      </Typography>
      <Box sx={{ display: "flex" }}>
        <SgpaTextField
          label="SGPA"
          inputProps={{
            value: value,
          }}
          onChangeCallback={(validatedNumber: string) => {
            setValue(validatedNumber);
          }}
        />
        <SgpaTextField
          label="credits"
          inputProps={{
            value: "21",
          }}
          onChangeCallback={(_: string) => {}}
          disabled={true}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">
          Semester Grade Pointer (SGPA): {parseFloat(value)}
        </Typography>
        <Slider
          min={40}
          max={100}
          value={parseFloat(value) * 10}
          onChange={onChangeSlider}
        />
      </Box>
    </Paper>
  );
};

export default SgpaContainer;
