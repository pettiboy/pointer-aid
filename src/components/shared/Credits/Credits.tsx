import { Link, SxProps, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type Props = {
  styles?: SxProps;
};

const Credits = ({ styles }: Props) => {
  const [searchParams] = useSearchParams();
  const theme = useTheme();

  return (
    <Typography sx={styles} variant="h6">
      Made with{" "}
      <span style={{ fontSize: "150%", color: theme.palette.primary.main }}>
        &hearts;
      </span>{" "}
      by{" "}
      {searchParams.get("jay")?.toLowerCase() === "csi" && (
        <span>
          <s>KJSCE codecell</s>{" "}
        </span>
      )}
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
