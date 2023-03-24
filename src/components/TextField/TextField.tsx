import {
  Box,
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
    value: string; // avoiding `StandardTextFieldProps` to prevent onChange being drilled down
  };
  onChangeCallback(validatedNumber: number): void;

  // drilled down to LockSwitch
  lockedState?: boolean;
  onLockStateChange?: (checked: boolean) => void;

  inputType?: "numeric" | "decimal";
}

export const TextField: React.FunctionComponent<Props> = ({
  inputProps,
  label,
  maxMarks,

  onChangeCallback,

  lockedState,
  onLockStateChange,

  inputType = "numeric",
}) => {
  const theme = useTheme();

  const { value: parentValue } = inputProps;
  const [value, setValue] = useState<number | string>(Number(parentValue));

  // error handling
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState<string | null>(null);

  // on change parent value
  // checks for errors and
  // updates local to reflect changes
  useEffect(() => {
    checkErrors(Number(parentValue));
    setValue(Number(parentValue));
  }, [inputProps]);

  // sets error boolean based on error text
  useEffect(() => {
    setError(helperText !== null && helperText.length > 0 ? true : false);
  }, [helperText, setError]);

  // helper function that sets error
  // and error text
  const checkErrors = (num: number) => {
    if (num > maxMarks) {
      setHelperText("exceeding maximum marks");
    } else if (num < 0) {
      setHelperText("below minimum marks");
    } else {
      setHelperText(null);
    }
  };

  const handleChange = (e: OnChangeEvent) => {
    let changedNum;
    if (inputType === "numeric") {
      changedNum = round(Number(e.target.value));
    } else {
      changedNum = parseFloat(e.target.value.toString());
    }

    if (!isNaN(changedNum) && changedNum !== 0) {
      // validate input
      checkErrors(changedNum);

      // set textfield value
      if (inputType === "numeric") {
        onChangeCallback(changedNum);
        setValue(changedNum);
      } else {
        onChangeCallback(parseFloat(e.target.value));
        setValue(e.target.value);
      }
    } else {
      setValue("");
    }
  };

  return (
    <Box sx={{ mb: 2, position: "relative" }}>
      <Box sx={{ position: "relative", width: "100%" }}>
        <Typography
          sx={{
            color: error
              ? theme.palette.error.main
              : theme.palette.text.secondary,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            top: "48%",
            left: "30%",
            fontSize: "larger",
            color: error
              ? theme.palette.error.main
              : theme.palette.text.secondary,
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
            lockIconColor={error ? theme.palette.error.main : undefined}
          />
        )}

        <MUITextField
          // error handling
          error={error}
          // state management
          value={value.toString()}
          onChange={handleChange}
          // styling
          fullWidth
          inputProps={{
            // keyboard type
            inputMode: inputType,

            // when bluring with empty string
            // set value to 0
            onBlur: () => {
              if (value.toString() === "") {
                setValue(0);
                onChangeCallback(0);
              }
            },
          }}
        />
      </Box>
      <Typography
        sx={{ color: theme.palette.error.main, position: "absolute" }}
        variant="subtitle2"
      >
        {helperText}
      </Typography>
    </Box>
  );
};
