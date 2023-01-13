import { IconButton, SxProps, useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { CSSProperties, useEffect } from "react";

type Props = {
  checked: boolean;
  onChangeCallback: (checked: boolean) => void;
  containerStyles?: SxProps;
  lockIconColor?: CSSProperties["color"];
};

const LockSwitch = ({
  containerStyles,
  checked,
  onChangeCallback,
  lockIconColor,
}: Props) => {
  const theme = useTheme();

  if (lockIconColor === undefined) lockIconColor = theme.palette.primary.main;
  useEffect(() => {}, [theme, lockIconColor]);

  return (
    <IconButton sx={containerStyles} onClick={() => onChangeCallback(!checked)}>
      {checked === true ? (
        <LockIcon sx={{ color: lockIconColor }} />
      ) : (
        <LockOpenIcon />
      )}
    </IconButton>
  );
};

export default LockSwitch;
