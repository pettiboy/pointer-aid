import { Box, CircularProgress, Unstable_Grid2 as Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Credits from "../../components/shared/Credits/Credits";
import PointerCalculator from "../../components/shared/PointerCalculator/PointerCalculator";
import PointerDisplay from "../../components/shared/PointerDisplay";
import calculatorStructure from "../../data/calculatorStructure";
import sumObject from "../../utils/sumObject";

type Props = {};

const Calculator = (_props: Props) => {
  const { college, branch, semester } = useParams();

  const [key, setKey] = useState<string>();
  const [loadingStatus, setLoadingStatus] = useState<StatusType>("loading");

  const [sgpi, setSgpi] = useState(0);

  const [cgs, setCgs] = useState<StringNumberObject>({});

  const [totalCredits, setTotalCredits] = useState<number>();

  useEffect(() => {
    setLoadingStatus("loading");

    const givenKey = `${college}_${branch}_${semester}`;

    if (givenKey in calculatorStructure) {
      setLoadingStatus("loaded");
      setKey(givenKey);
    } else {
      setLoadingStatus("no_data");
    }
  }, [college, branch, semester]);

  useEffect(() => {
    if (!key) return;

    const avg = sumObject(cgs) / getTotalCredits(calculatorStructure[key]);
    const pointer = Math.round((avg + Number.EPSILON) * 100) / 100;
    setSgpi(pointer);
  }, [cgs, key]);

  const getTotalCredits = (data: PointerCalculatorStructureType[]) => {
    if (totalCredits) {
      return totalCredits;
    } else {
      const numberString = data.reduce(
        (total, obj) => obj.creditDistribution + total,
        ""
      );
      const credits = numberString
        .split("")
        .reduce((prev, curr) => prev + parseInt(curr), 0);

      setTotalCredits(credits);
      return credits;
    }
  };

  const handleInputChange = (name: string, value: number) => {
    setCgs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Box sx={{ p: 5 }}>
      {loadingStatus === "loaded" && key && (
        <>
          <Box sx={{ mb: 7 }}></Box> {/* offset navbar */}
          <Grid
            container
            spacing={6}
            style={{
              alignItems: "stretch",
            }}
          >
            {calculatorStructure[key].map((subject) => (
              <Grid key={subject.subjectCode} xs={12} md={6} lg={6} xl={4}>
                <PointerCalculator
                  subjectName={subject.subjectName}
                  subjectCode={subject.subjectCode}
                  creditDistribution={subject.creditDistribution}
                  maxMarks={subject.maxMarks}
                  handleInputChange={handleInputChange}
                />
              </Grid>
            ))}
          </Grid>
          <Credits styles={{ textAlign: "center", mb: 10, mt: 3 }} />
          <PointerDisplay pointer={sgpi} />
        </>
      )}
      {loadingStatus === "no_data" && (
        <Box className="h-85 flex-center">
          <h1>No calculator available yet</h1>
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

export default Calculator;
