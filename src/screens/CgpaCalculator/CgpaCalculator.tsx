import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CgpaContainer from "../../components/CgpaContainer/CgpaContainer";
import CgpaDisplay from "../../components/CgpaDisplay/CgpaDisplay";

type Props = {};

const CgpaCalculator = (props: Props) => {
  const { college, branch } = useParams();

  const [sgpi, setSgpi] = useState<number | null>(null);
  const [cgs, setCgs] = useState<StringNumberObject>({});

  return (
    <Box sx={{ p: 5 }}>
      <Helmet>
        <title>
          CGPA Calculator | {branch?.toUpperCase()} {college?.toUpperCase()} |
          Pointer Aid
        </title>
      </Helmet>
      <Box sx={{ mb: 7 }}></Box> {/* offset navbar */}
      <Grid
        container
        spacing={6}
        style={{
          alignItems: "stretch",
        }}
      >
        <Grid key={2} xs={12} md={6} lg={6} xl={4}>
          <CgpaContainer
            label={"Semester 1"}
            credits={22}
            onUpdateCallback={(updatedWeight) => {}}
          />
        </Grid>
      </Grid>
      <CgpaDisplay cgpa={sgpi} />
    </Box>
  );
};

export default CgpaCalculator;
