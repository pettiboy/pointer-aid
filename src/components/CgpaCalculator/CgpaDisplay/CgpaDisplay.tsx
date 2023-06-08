import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";
import LockIcon from "@mui/icons-material/Lock";

type Props = {};

// Todo(responsiveness): for large screens make display of CGPA
//      label and value side by side for both containers

const CgpaDisplay = (props: Props) => {
  const isKeyboardOpen = useDetectKeyboardOpen();
  const theme = useTheme();

  const {
    calculateCurrentAverage,
    calculateCurrentAverageForLocked,
    calculateLockedSems,
    refreshAverageCount,
    refreshLockedAverageCount,
  } = useContext(CgpaCalculatorContext);

  const [currentAverage, setCurrentAverage] = useState<number>(
    calculateCurrentAverage()
  );

  const [currentLockedAverage, setCurrentLockedAverage] = useState<number>(0);

  useEffect(() => {
    const updatedCurrentAverage = calculateCurrentAverage();

    setCurrentAverage(updatedCurrentAverage);
  }, [refreshAverageCount]);

  useEffect(() => {
    const updatedCurrentLockedAverage = calculateCurrentAverageForLocked();

    setCurrentLockedAverage(updatedCurrentLockedAverage);
  }, [refreshLockedAverageCount]);

  return (
    <>
      {!isKeyboardOpen && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100vw",
            px: 2,
            py: 2,
            zIndex: 9,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* container for current CGPA (only locked semesters considered) */}
            <Box
              sx={{
                flex: 1,
                borderRight: "1px solid " + theme.palette.primary.main,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography>
                  CGPA {calculateLockedSems()} sems {"("}
                </Typography>
                <LockIcon
                  sx={{ width: 15, color: theme.palette.primary.main }}
                />
                <Typography>{")"}</Typography>
              </Box>
              <Typography sx={{}} variant="h4">
                {currentLockedAverage.toString()}
              </Typography>
            </Box>
            {/* container for overall CGPA (all semesters considered) */}
            <Box
              sx={{
                flex: 1,
                textAlign: "right",
                pr: 2,
              }}
            >
              <Typography>Total CGPA</Typography>
              <Typography sx={{}} variant="h4">
                {currentAverage.toString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default CgpaDisplay;
