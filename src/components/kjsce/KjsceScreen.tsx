import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import calculatorStructure from "../../data/calculatorStructure";

type Props = {};

const KjsceScreen = (props: Props) => {
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

  const getAllBranches = () => {
    if (allBranches.length < 1) {
      const branches = Object.keys(calculatorStructure).map((key) =>
        key.split("_")[1].toUpperCase()
      );
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
    setSelectedBranch(val);
  };
  const onOpenBranch = () => {
    setOpenBranches(true);
  };
  const onCloseBranch = () => {
    setOpenBranches(true);
  };

  const getAllSemesters = (branch: string) => {
    const semesters: string[] = [];
    Object.keys(calculatorStructure).map((key) =>
      key.split("_").map((val) => {
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
    setSelectedSemester(val);
  };
  const onOpenSemester = () => {
    setOpenSemesters(true);
  };
  const onCloseSemester = () => {
    setOpenSemesters(true);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* branch */}
      <Autocomplete
        sx={{ width: 200 }}
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

      {/* semester */}
      <Autocomplete
        sx={{ width: 200 }}
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
    </Box>
  );
};

export default KjsceScreen;
