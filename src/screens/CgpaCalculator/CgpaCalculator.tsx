import { Box } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

type Props = {};

const CgpaCalculator = (props: Props) => {
  const { college, branch } = useParams();

  return (
    <Box sx={{ p: 5 }}>
      <Helmet>
        <title>
          CGPA Calculator | {branch?.toUpperCase()} {college?.toUpperCase()} |
          Pointer Aid
        </title>
      </Helmet>
      <Box sx={{ mb: 7 }}></Box> {/* offset navbar */}
      CgpaCalculator
    </Box>
  );
};

export default CgpaCalculator;
