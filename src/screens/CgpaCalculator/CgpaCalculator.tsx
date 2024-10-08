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
import cgpaData from "../../data/cgpaData";

type Props = {};

const CgpaCalculator = (props: Props) => {
  const { college, branch, graduatingYear } = useParams();

  const [calculatorData, setCalculatorData] = useState<
    CgpaCalculatorStructureType[] | null
  >(null);
  const [loadingStatus, setLoadingStatus] = useState<StatusType>("loading");

  useEffect(() => {
    setLoadingStatus("loading");

    const givenKey = `${college}_${branch}_${graduatingYear}`;
    if (givenKey in cgpaData) {
      // update data for calculator
      setCalculatorData(cgpaData[givenKey]);
      setLoadingStatus("loaded");
    } else {
      setLoadingStatus("no_data");
    }

    return () => {
      setCalculatorData(null);
    };
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {loadingStatus === "loaded" && calculatorData && (
        <>
          <Helmet>
            <title>
              {college?.toUpperCase()} {branch?.toUpperCase()} CGPA Calculator |
              Pointer Aid
            </title>
          </Helmet>
          <Box sx={{ mb: 5 }}></Box> {/* offset navbar */}
          {/* code starts here */}
          <Grid
            container
            spacing={4}
            sx={{
              mt: 6,
            }}
            style={{
              alignItems: "stretch",
            }}
          >
            {calculatorData.map((data) => (
              <Grid key={data.semesterId} xs={12} sm={6} md={4} lg={4} xl={4}>
                <SgpaContainer
                  id={data.semesterId}
                  title={data.semesterName}
                  weightage={data.maxCredits}
                  warningText={data.warningText}
                  supportsOet={data.supportsOet}
                  supportsOehm={data.supportsOehm}
                />
              </Grid>
            ))}
          </Grid>
          <Credits styles={{ textAlign: "center", mb: 20, mt: 3 }} />
        </>
      )}

      {/* also handles cgpa target input field */}
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
