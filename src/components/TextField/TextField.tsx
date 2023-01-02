import {
  Box,
  StandardTextFieldProps,
  TextField as MUITextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import LockSwitch from "../LockSwitch/LockSwitch";

export interface Props {
  label: string;
  maxMarks: number;
  inputProps: StandardTextFieldProps;

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

      <MUITextField fullWidth {...inputProps} />
    </Box>
  );
};
