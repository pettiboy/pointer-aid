import {
  Box,
  StandardTextFieldProps,
  TextField as MUITextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockSwitch from "../LockSwitch/LockSwitch";
import round from "../../utils/round";

export interface Props {
  label: string;
  maxMarks: number;
  inputProps: {
    value: string;
    onChange(num: number): void;
  };

  // drilled down to LockSwitch
  lockedState?: boolean;
  onLockStateChange?: (checked: boolean) => void;
}

export const TextField: React.FunctionComponent<Props> = ({
  inputProps,
  label,
  maxMarks,

  lockedState,
  onLockStateChange,
}) => {
  const theme = useTheme();
  const { value, onChange } = inputProps;
  const [val, setVal] = useState(Number(value));
  const [error, setError] = useState(false);

  const checkErrors = (num: number) => {
    if (num > maxMarks) setError(true);
    else if (num < 0) setError(true);
    else {
      setError(false);
    }
  };

  const handleChange = (e: OnChangeEvent) => {
    let num = round(Number(e.target.value));
    if (!isNaN(num)) {
      checkErrors(num);
      setVal(round(Number(e.target.value)));
      onChange(num);
    } else setVal(0);
  };

  useEffect(() => {
    checkErrors(Number(value));
    setVal(Number(value));
  }, [inputProps]);

  return (
    <Box sx={{ position: "relative", mb: 2, width: "100%" }}>
      <Typography sx={{ color: theme.palette.text.secondary }}>
        {label}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "48%",
          left: "30%",
          fontSize: "larger",
          color: theme.palette.text.secondary,
        }}
      >
        / {maxMarks}
      </Typography>

      {lockedState !== undefined && onLockStateChange !== undefined && (
        <LockSwitch
          containerStyles={{
            position: "absolute",
            top: "40%",
            right: "5%",
            fontSize: "larger",
            zIndex: 9,
          }}
          checked={lockedState}
          onChangeCallback={onLockStateChange}
        />
      )}

      <MUITextField
        error={error}
        fullWidth
        value={val}
        onChange={handleChange}
      />
    </Box>
  );
};
