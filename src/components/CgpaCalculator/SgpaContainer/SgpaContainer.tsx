import { Paper, Typography, Box, Slider, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SgpaTextField from "../SgpaTextField/SgpaTextField";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";
import LockSwitch from "../../LockSwitch/LockSwitch";
import useWindowDimensions from "../../../hooks/useWindowDimentions";

type Props = {
  id: string;
  title: string;
  weightage: number;
};

// todo(priority): save data to local storage
// todo(suggession): minimise container when locked to save space

const SgpaContainer = ({ id, title, weightage }: Props) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 600;

  const { addToAverage, refreshRequestPrediction, getPredictionFor } =
    useContext(CgpaCalculatorContext);

  const [value, setValue] = useState<string>("9.0");
  const [lockedState, setLockedState] = useState(false);

  useEffect(() => {
    addToAverage(id, parseFloat(value), weightage, lockedState);
  }, [value]);

  useEffect(() => {
    const predictedValue = getPredictionFor(id);
    if (predictedValue !== -1) {
      setValue(predictedValue.toString());
    }
  }, [refreshRequestPrediction]);

  const onChangeLockState = (checked: boolean) => {
    setLockedState(checked);

    // add to average preventing refresh of cgpa display
    // this is to just send the updarted lock state to the context
    addToAverage(id, parseFloat(value), weightage, checked, true);
  };

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    setValue(((value as number) / 10).toString());
  };

  return (
    <Paper
      className="sgpa-paper-container"
      sx={
        lockedState ? { border: "2px solid " + theme.palette.primary.main } : {}
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: isSmallDevice ? 1 : 2,
        }}
      >
        <Typography variant="h4">{title}</Typography>

        <LockSwitch
          checked={lockedState}
          onChangeCallback={onChangeLockState}
        />
      </Box>
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
      <Box sx={{ mt: isSmallDevice ? 1 : 2 }}>
        {/* <Typography> */}
        {/* SGPA: {parseFloat(value)} */}
        {/* todo: add an info icon showing what is SGPA */}
        {/* </Typography> */}
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
