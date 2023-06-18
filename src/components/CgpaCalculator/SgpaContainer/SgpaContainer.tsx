import { Paper, Typography, Box, Slider, Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SgpaTextField from "../SgpaTextField/SgpaTextField";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";
import LockSwitch from "../../LockSwitch/LockSwitch";
import useWindowDimensions from "../../../hooks/useWindowDimentions";
import { useParams } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  weightage: number;
  warningText?: string;
  supportsOetOehm?: boolean;
};

const fallbackDefaultValues: GpaLocalStorageType = {
  value: "9.0",
  fix: false,
};

// todo(suggession): minimise container when locked to save space

const SgpaContainer = ({
  id,
  title,
  weightage,
  warningText,
  supportsOetOehm,
}: Props) => {
  const { college, branch } = useParams();
  const defaultValues: GpaLocalStorageType = JSON.parse(
    localStorage.getItem(`${college}_${branch}_${id}`) ||
      JSON.stringify(fallbackDefaultValues)
  );

  const { width } = useWindowDimensions();
  const isSmallDevice = width < 600;

  const { addToAverage, refreshRequestPrediction, getPredictionFor } =
    useContext(CgpaCalculatorContext);

  const [value, setValue] = useState<string>(defaultValues.value);
  const [lockedState, setLockedState] = useState(defaultValues.fix);

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

  useEffect(() => {
    localStorage.setItem(
      `${college}_${branch}_${id}`,
      JSON.stringify({
        value: value,
        fix: lockedState,
      })
    );
  }, [value, lockedState]);

  return (
    <Paper className="sgpa-paper-container">
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
      {warningText && (
        <Box sx={{ mt: 2 }}>
          <Alert variant="outlined" severity="info">
            {warningText}
          </Alert>
        </Box>
      )}
      <Box sx={{ mt: isSmallDevice ? 1 : 2 }}>
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
