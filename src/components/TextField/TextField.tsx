import {
  Box,
  StandardTextFieldProps,
  TextField as MUITextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

export interface Props {
  label: string;
  maxMarks: number;
  inputProps: StandardTextFieldProps;
}

export const TextField: React.FunctionComponent<Props> = ({
  inputProps,
  label,
  maxMarks,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ position: "relative", mb: 2, width: "100%" }}>
      <Typography>{label}</Typography>
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
      <MUITextField fullWidth {...inputProps} />
    </Box>
  );
};
