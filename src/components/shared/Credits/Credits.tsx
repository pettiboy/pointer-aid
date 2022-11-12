import { Link, SxProps, Typography, useTheme } from "@mui/material";

type Props = {
  styles?: SxProps;
};

const Credits = ({ styles }: Props) => {
  const theme = useTheme();

  return (
    <Typography sx={styles} variant="h6">
      Made with{" "}
      <span style={{ fontSize: "150%", color: theme.palette.primary.main }}>
        &hearts;
      </span>{" "}
      by{" "}
      <Link
        href="https://pettiboy.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        Hussain Pettiwala
      </Link>{" "}
      and{" "}
      <Link
        href="https://github.com/Arya-A-Nair"
        rel="noopener noreferrer"
        target="_blank"
      >
        Arya Nair
      </Link>
    </Typography>
  );
};

export default Credits;
