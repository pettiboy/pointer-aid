import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import calculatorStructure from "../../data/calculatorStructure";
import { useNavigate } from "react-router-dom";

type Props = {};

const KjsceScreen = (props: Props) => {
  let navigate = useNavigate();

  const [openBranches, setOpenBranches] = useState(false);
  const [allBranches, setAllBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [branchLoadingStatus, setBranchLoadingStatus] =
    useState<StatusType>("loading");

  const [openSemesters, setOpenSemesters] = useState(false);
  const [allSemesters, setAllSemesters] = useState<string[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [semesterLoadingStatus, setSemesterLoadingStatus] =
    useState<StatusType>("loaded");

  useEffect(() => {
    setBranchLoadingStatus("loading");

    setAllBranches(getAllBranches());

    setOpenBranches(true);
    setBranchLoadingStatus("loaded");
  }, []);

  useEffect(() => {
    setSelectedSemester("");
    if (selectedBranch.length > 0) {
      setSemesterLoadingStatus("loading");

      setAllSemesters(getAllSemesters(selectedBranch));

      setOpenSemesters(true);
      setSemesterLoadingStatus("loaded");
    }
  }, [selectedBranch]);

  const onPressOpenCalculator = () => {
    navigate(
      `/kjsce/${selectedBranch.toLowerCase()}/sem${
        selectedSemester.split(" ")[1]
      }/calculator`
    );
  };

  const getAllBranches = () => {
    if (allBranches.length < 1) {
      const branches = Object.keys(calculatorStructure)
        .map((key) => key.split("_")[1].toUpperCase())
        .filter((v, i, a) => a.indexOf(v) === i); // ensure unique values
      return branches;
    } else {
      return allBranches;
    }
  };

  const onChangeBranch = (
    e: React.SyntheticEvent<Element, Event>,
    val: string | null
  ) => {
    if (!val) return;
    setOpenBranches(false);
    setSelectedBranch(val);
  };
  const onOpenBranch = () => {
    setOpenBranches(true);
  };
  const onCloseBranch = () => {
    setOpenBranches(false);
  };

  const getAllSemesters = (branch: string) => {
    const semesters: string[] = [];
    Object.keys(calculatorStructure).map((key) =>
      key.split("_").forEach((val) => {
        if (val === branch.toLowerCase()) {
          const semValStr = key.split("_")[2].toUpperCase();

          semesters.push("Semester " + semValStr.slice(3));
        }
      })
    );

    return semesters;
  };

  const onChangeSemester = (
    e: React.SyntheticEvent<Element, Event>,
    val: string | null
  ) => {
    if (!val) return;
    setOpenSemesters(false);
    setSelectedSemester(val);
  };
  const onOpenSemester = () => {
    setOpenSemesters(true);
  };
  const onCloseSemester = () => {
    setOpenSemesters(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box sx={{ minWidth: "50vw" }}>
        <Grid container spacing={2}>
          {/* branch */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              open={openBranches}
              value={selectedBranch}
              autoSelect
              onChange={onChangeBranch}
              onOpen={onOpenBranch}
              onClose={onCloseBranch}
              options={allBranches}
              loading={branchLoadingStatus === "loading"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Branch"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {branchLoadingStatus === "loading" ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                    style: { textTransform: "uppercase" },
                  }}
                />
              )}
            />
          </Grid>

          {/* semester */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              open={openSemesters}
              value={selectedSemester}
              autoSelect
              onChange={onChangeSemester}
              onOpen={onOpenSemester}
              onClose={onCloseSemester}
              options={allSemesters}
              loading={semesterLoadingStatus === "loading"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Semester"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {semesterLoadingStatus === "loading" ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                    style: { textTransform: "uppercase" },
                  }}
                />
              )}
            />
          </Grid>

          {/* button */}
          <Grid item xs={12}>
            <Button
              disabled={
                selectedBranch.length === 0 || selectedSemester.length === 0
              }
              onClick={onPressOpenCalculator}
              variant="contained"
              color="success"
              size="large"
              fullWidth
            >
              Open
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default KjsceScreen;
