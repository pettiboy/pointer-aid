import { IconButton, SxProps, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

type Props = {
  checked: boolean;
  onChangeCallback: (checked: boolean) => void;
  containerStyles?: SxProps;
};

const LockSwitch = ({ containerStyles, checked, onChangeCallback }: Props) => {
  const theme = useTheme();
  const [lockedState, setLockedState] = useState(checked);

  useEffect(() => {
    onChangeCallback(lockedState);
  }, [lockedState]);

  return (
    <IconButton
      sx={containerStyles}
      onClick={() => setLockedState((prev) => !prev)}
    >
      {lockedState === true ? (
        <LockIcon sx={{ color: theme.palette.primary.main }} />
      ) : (
        <LockOpenIcon />
      )}
    </IconButton>
  );
};

export default LockSwitch;
