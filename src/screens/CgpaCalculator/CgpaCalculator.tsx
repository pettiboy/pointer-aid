import {
  Box,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

type Props = {};

const CgpaCalculator = (props: Props) => {
  const { college, branch, semester } = useParams();

  const [loadingStatus, setLoadingStatus] = useState<StatusType>("loading");

  const [value, setValue] = useState<string>("9.0");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setValue("");
    } else setValue(event.target.value);
  };

  useEffect(() => {
    console.log("semester", semester);
    setLoadingStatus("loaded");
  }, []);

  const onChangeSlider = (
    _e: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    setValue(((value as number) / 10).toString());
  };

  return (
    <Box sx={{ p: 5 }}>
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
            spacing={6}
            style={{
              alignItems: "stretch",
            }}
          >
            <Grid xs={12} md={6} lg={6} xl={4}>
              <Paper className="pointer-paper-container">
                <Typography sx={{ mb: 1 }} variant="h4">
                  Semester 1
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    value={value}
                    onChange={handleChange}
                    label="SGPA"
                    sx={{}}
                  />
                  <TextField value={21} disabled />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">
                    Semester Grade Pointer (SGPA): {parseFloat(value)}
                  </Typography>
                  <Slider
                    min={40}
                    max={100}
                    value={parseFloat(value) * 10}
                    onChange={onChangeSlider}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
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
