import React from "react";
import { Link, SxProps, Typography } from "@mui/material";

type Props = {
  styles?:SxProps
};

const Credits = (props: Props) => {
  const {styles}=props;
  return (
    <Typography sx={styles} variant="h6">
      Made with <span style={{ fontSize: "150%", color: "red" }}>&hearts;</span>{" "}
      by <Link href="https://github.com/pettiboy">Hussain Pettiwala</Link> and{" "}
      <Link href="https://github.com/Arya-A-Nair">Arya Nair</Link>
    </Typography>
  );
};

export default Credits;
