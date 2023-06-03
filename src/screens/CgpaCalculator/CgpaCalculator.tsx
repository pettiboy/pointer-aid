import {
  Box,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import SgpaContainer from "../../components/CgpaCalculator/SgpaContainer/SgpaContainer";
import CgpaDisplay from "../../components/CgpaCalculator/CgpaDisplay/CgpaDisplay";
import Credits from "../../components/Credits/Credits";

type Props = {};

const CgpaCalculator = (props: Props) => {
  const { college, branch } = useParams();

  const [loadingStatus, setLoadingStatus] = useState<StatusType>("loading");

  useEffect(() => {
    setLoadingStatus("loaded");
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {loadingStatus === "loaded" && (
        <>
          <Helmet>
            <title>
              {college?.toUpperCase()} {branch?.toUpperCase()} CGPA Calculator |
              Pointer Aid
            </title>
          </Helmet>
          <Box sx={{ mb: 7 }}></Box> {/* offset navbar */}
          {/* code starts here */}
          <Grid
            container
            spacing={4}
            style={{
              alignItems: "stretch",
            }}
          >
            <Grid xs={12} md={6} lg={6} xl={4}>
              <SgpaContainer id="1" title="Semester 1" weightage={21} />
            </Grid>
            <Grid xs={12} md={6} lg={6} xl={4}>
              <SgpaContainer id="2" title="Semester 2" weightage={32} />
            </Grid>
            <Grid xs={12} md={6} lg={6} xl={4}>
              <SgpaContainer id="3" title="Semester 3" weightage={22} />
            </Grid>

            <Credits styles={{ textAlign: "center", mb: 10, mt: 3 }} />
          </Grid>
        </>
      )}

      <CgpaDisplay />

      {loadingStatus === "no_data" && (
        <Box className="h-85 flex-center">
          <Typography variant="h1">No calculator available yet</Typography>
        </Box>
      )}
      {loadingStatus === "loading" && (
        <Box className="h-85 flex-center">
          <CircularProgress size={50} />
        </Box>
      )}
    </Box>
  );
};

export default CgpaCalculator;
