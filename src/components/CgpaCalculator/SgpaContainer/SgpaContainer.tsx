import { Paper, Typography, Box, Slider } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SgpaTextField from "../SgpaTextField/SgpaTextField";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";

type Props = {
  id: string;
  title: string;
  weightage: number;
};

const SgpaContainer = ({ id, title, weightage }: Props) => {
  const { addToAverage } = useContext(CgpaCalculatorContext);

  const [value, setValue] = useState<string>("9.0");

  useEffect(() => {
    addToAverage(id, parseFloat(value), weightage);
  }, [value]);

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
        {title}
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
            value: weightage.toString(),
          }}
          onChangeCallback={(_: string) => {}}
          disabled={true}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>
          SGPA: {parseFloat(value)}
          {/* todo: add an info icon showing what is SGPA */}
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
