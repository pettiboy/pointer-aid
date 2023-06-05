import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";
import round from "../../../utils/round";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import HideOnScroll from "../../utils/HideOnScroll/HideOnScroll";

type Props = {};

const CgpaTarget = (props: Props) => {
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
    <HideOnScroll>
      <Paper sx={{ p: 2, position: "fixed", zIndex: 1, right: 10, left: 10 }}>
        <Box>
          <Typography variant="subtitle2">Target CGPA</Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              value={cgpaInputState}
              onChange={onChangeCgpaInput}
              inputProps={{
                inputMode: "decimal",
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
      </Paper>
    </HideOnScroll>
  );
};

export default CgpaTarget;
