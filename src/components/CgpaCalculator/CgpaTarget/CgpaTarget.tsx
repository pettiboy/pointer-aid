import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";
import round from "../../../utils/round";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import useWindowDimensions from "../../../hooks/useWindowDimentions";

type Props = {};

const CgpaTarget = (props: Props) => {
  const { width } = useWindowDimensions();

  const [cgpaInputState, setCgpaInputState] = useState<string>("");

  const { calculateAndRefreshPredictions } = useContext(CgpaCalculatorContext);

  // input on change function
  const onChangeCgpaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCgpaInputState(value);
  };

  // on click function
  const onClickCalculate = () => {
    const inputValue = round(parseFloat(cgpaInputState), 2);

    if (!inputValue) return;

    calculateAndRefreshPredictions(inputValue);
  };

  return (
    <Box>
      <Typography variant="subtitle2">Target CGPA</Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          value={cgpaInputState}
          onChange={onChangeCgpaInput}
          inputProps={{
            inputMode: "decimal",
            style: {
              padding: width > 800 ? "default" : 10,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={onClickCalculate}
          endIcon={<SyncAltIcon />}
          sx={{ ml: 3 }}
        >
          Predict
        </Button>
      </Box>
    </Box>
  );
};

export default CgpaTarget;
