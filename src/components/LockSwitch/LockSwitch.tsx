import { IconButton, SxProps, useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

type Props = {
  checked: boolean;
  onChangeCallback: (checked: boolean) => void;
  containerStyles?: SxProps;
};

const LockSwitch = ({ containerStyles, checked, onChangeCallback }: Props) => {
  const theme = useTheme();

  return (
    <IconButton sx={containerStyles} onClick={() => onChangeCallback(!checked)}>
      {checked === true ? (
        <LockIcon sx={{ color: theme.palette.primary.main }} />
      ) : (
        <LockOpenIcon />
      )}
    </IconButton>
  );
};

export default LockSwitch;
