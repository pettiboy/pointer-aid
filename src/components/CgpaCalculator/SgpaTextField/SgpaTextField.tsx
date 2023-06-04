import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  TextField as MUITextField,
} from "@mui/material";

type Props = {
  label?: string;
  inputProps: {
    value: string; // avoiding `StandardTextFieldProps` to prevent onChange being drilled down
  };
  onChangeCallback(validatedNumber: string): void;

  disabled?: boolean;
};

const SgpaTextField = ({
  label = "",
  inputProps,
  onChangeCallback,
  disabled = false,
}: Props) => {
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
    if (disabled) return;

    checkErrors(Number(parentValue));

    if (value !== parentValue) {
      setValue(parentValue);
    }
  }, [inputProps.value]);

  // sets error boolean based on error text
  useEffect(() => {
    if (disabled) return;

    setError(helperText !== null && helperText.length > 0 ? true : false);
  }, [helperText, setError]);

  // helper function that sets error
  // and error text
  const checkErrors = (num: number) => {
    if (num > 10) {
      setHelperText("exceeding maximum pointer");
    } else if (num < 4) {
      setHelperText("below minimum passing pointer");
    } else {
      setHelperText(null);
    }
  };

  const handleChange = (e: OnChangeEvent) => {
    const rawValue = e.target.value;
    const changedNum = parseFloat(rawValue);

    if (rawValue.includes(".") === true) {
      setValue(rawValue);

      // callback to update value in parent
      onChangeCallback(rawValue);
    } else if (!isNaN(changedNum) && changedNum !== 0) {
      // validate input
      checkErrors(changedNum);

      // set textfield value
      setValue(changedNum);

      // callback to update value in parent
      onChangeCallback(changedNum.toString());
    } else {
      setValue("");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: error
            ? theme.palette.error.main
            : theme.palette.text.secondary,
        }}
      >
        {label}
      </Typography>
      <MUITextField
        // error handling
        error={error}
        // state management
        value={value.toString()}
        onChange={handleChange}
        // styling
        fullWidth
        disabled={disabled}
        inputProps={{
          // keyboard type
          inputMode: "decimal",

          // when bluring with empty string
          // set value to 0
          onBlur: () => {
            if (value.toString() === "") {
              setValue(0);
              onChangeCallback("0");
            }
          },
        }}
      />
      <Typography sx={{ color: theme.palette.error.main }} variant="subtitle2">
        {helperText}
      </Typography>
    </Box>
  );
};

export default SgpaTextField;
