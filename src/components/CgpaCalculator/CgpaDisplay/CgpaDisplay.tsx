import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";
import LockIcon from "@mui/icons-material/Lock";
import useWindowDimensions from "../../../hooks/useWindowDimentions";
import CgpaTarget from "../CgpaTarget/CgpaTarget";

type Props = {};

const CgpaDisplay = (props: Props) => {
  const isKeyboardOpen = useDetectKeyboardOpen();
  const { width } = useWindowDimensions();
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
      {/* the complete bottom container should be 
          if keyboard is open AND cgpa target input 
          is not in focus */}
      <Paper
        sx={{
          pb: 2,
          pt: 1,

          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          zIndex: 9,
        }}
      >
        {/* cgpa target for smaller screens
              stacks on top of display section */}
        {width <= 700 && (
          <Box
            sx={{
              pb: 2,
              px: 2,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: !isKeyboardOpen
                ? "1px solid " + theme.palette.text.disabled
                : "none",
            }}
          >
            <CgpaTarget />
          </Box>
        )}

        {/* for smaller screens hide the bottom 
          display of CGPA's when keyboard is open
          - checking width ensures that tablets are not
          affected by this assumption */}
        {(!isKeyboardOpen || width > 700) && (
          <Box
            sx={{
              pt: 2,
              px: 2,

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
                // right border only requuired in larger screens
                // as there is no target container in between
                // handling the borders
                borderRight:
                  width < 700
                    ? "1px solid " + theme.palette.primary.main
                    : "none",
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

            {/* target container comes in between `current 
                CGPA` and `total CGPA` for large screens */}
            {width > 700 && (
              <Box
                sx={{
                  borderLeft: "1px solid " + theme.palette.primary.main,
                  borderRight: "1px solid " + theme.palette.primary.main,
                  // padding increased for very large screens
                  px: width > 900 ? 10 : 2,
                }}
              >
                <CgpaTarget />
              </Box>
            )}

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
        )}
      </Paper>
    </>
  );
};

export default CgpaDisplay;
