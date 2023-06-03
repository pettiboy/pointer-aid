import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { CgpaCalculatorContext } from "../../../context/CgpaCalculatorContext";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import useWindowDimensions from "../../../hooks/useWindowDimentions";

type Props = {};

// Todo: input validation
// Todo: for large screens align to side

const CgpaDisplay = (props: Props) => {
  const isKeyboardOpen = useDetectKeyboardOpen();
  const { width } = useWindowDimensions();

  const { calculateCurrentAverage, refreshAverageCount } = useContext(
    CgpaCalculatorContext
  );

  const [currentAverage, setCurrentAverage] = useState<number>(
    calculateCurrentAverage()
  );

  const [cgpaInputState, setCgpaInputState] = useState<string>("");

  const [isCgpaInputFocused, setIsCgpaInputFocused] = useState(false);

  useEffect(() => {
    const updatedCurrentAverage = calculateCurrentAverage();

    setCurrentAverage(updatedCurrentAverage);
    setCgpaInputState(updatedCurrentAverage.toString());
  }, [refreshAverageCount]);

  // input on change function
  const onChangeCgpaInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCgpaInputState(value);
  };

  const handleFocus = () => {
    setIsCgpaInputFocused(true);
  };

  const handleBlur = () => {
    setIsCgpaInputFocused(false);
  };

  const showEqualizer = cgpaInputState !== currentAverage.toString();

  const spacingL = !showEqualizer && width > 600 ? 3 : 2;
  const spacingM = !showEqualizer && width > 600 ? 2 : 1;

  return (
    <>
      {(!isKeyboardOpen || isCgpaInputFocused) && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100vw",
            px: spacingL,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant={showEqualizer && width < 600 ? "h5" : "h4"}
                sx={{ mr: spacingM }}
              >
                CGPA:
              </Typography>

              <Box>
                {showEqualizer && (
                  <Typography variant="subtitle2">Target</Typography>
                )}
                <TextField
                  value={cgpaInputState}
                  onChange={onChangeCgpaInput}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  inputProps={{
                    inputMode: "decimal",
                    style: showEqualizer
                      ? {
                          padding: 8,
                        }
                      : {},
                  }}
                />
              </Box>

              {showEqualizer && (
                <>
                  <Button
                    variant="outlined"
                    endIcon={<SyncAltIcon />}
                    sx={{ ml: spacingM, minWidth: 100, alignSelf: "stretch" }}
                  >
                    {"sync"}
                  </Button>
                  <Box sx={{ ml: spacingM }}>
                    <Typography variant="subtitle2">Current</Typography>
                    <Typography sx={{}} variant="h4">
                      {currentAverage}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default CgpaDisplay;
