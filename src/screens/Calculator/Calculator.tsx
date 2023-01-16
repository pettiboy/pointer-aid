import {
  Box,
  CircularProgress,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import calculatorStructure from "../../data/calculatorStructure";
import sumObject from "../../utils/sumObject";
import { Helmet } from "react-helmet-async";
import { romanize } from "../../utils/romanize";
import Credits from "../../components/Credits/Credits";
import PointerCalculator from "../../components/PointerCalculator/PointerCalculator";
import PointerDisplay from "../../components/PointerDisplay/PointerDisplay";
import { CalculatorContext } from "../../context/CalculatorContext";

type Props = {};

const Calculator = (_props: Props) => {
  const { college, branch, semester } = useParams();

  const { filteredCalculatorData, setCalculatorData } =
    useContext(CalculatorContext);

  const [loadingStatus, setLoadingStatus] = useState<StatusType>("loading");

  const [sgpi, setSgpi] = useState<number | null>(null);

  const [cgs, setCgs] = useState<StringNumberObject>({});

  const [totalCredits, setTotalCredits] = useState<number | null>(null);

  // parses the URL and fetches data based on the URL
  // handles loading statuses
  useEffect(() => {
    setLoadingStatus("loading");

    const givenKey = `${college}_${branch}_${semester}`;

    if (givenKey in calculatorStructure) {
      // update calculator data in parent context
      setCalculatorData(calculatorStructure[givenKey]);
    } else {
      setLoadingStatus("no_data");
    }

    return () => {
      setCalculatorData(null);
    };
  }, [college, branch, semester]);

  // handle loading states by listening for filteredCalculatorData
  useEffect(() => {
    // reset total credits
    setTotalCredits(null);

    if (filteredCalculatorData) {
      setLoadingStatus("loaded");
    } else {
      setLoadingStatus("loading");
    }
  }, [filteredCalculatorData]);

  // updates the total pointer for the bottom component
  useEffect(() => {
    if (!filteredCalculatorData) return;

    const avg = sumObject(cgs) / getTotalCredits(filteredCalculatorData);
    const pointer = Math.round((avg + Number.EPSILON) * 100) / 100;

    setSgpi(pointer);
  }, [cgs, filteredCalculatorData]);

  /**
   * given an array of `PointerCalculatorStructureType` computes the total
   * sum of the credits by parsing the keys into integers and adding them.
   * Stores the total credits in state to reduce computation time
   *
   * @param {PointerCalculatorStructureType[]} data
   * @returns {number} credits
   */
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
      {loadingStatus === "loaded" && filteredCalculatorData && (
        <>
          <Helmet>
            <title>
              {college?.toUpperCase()} {branch?.toUpperCase()} SEM-
              {romanize(parseInt(semester?.slice(3) || "1"))} Calculator |
              Pointer Aid
            </title>
          </Helmet>
          <Box sx={{ mb: 7 }}></Box> {/* offset navbar */}
          <Grid
            container
            spacing={6}
            style={{
              alignItems: "stretch",
            }}
          >
            {filteredCalculatorData.map((subject) => (
              <Grid key={subject.subjectCode} xs={12} md={6} lg={6} xl={4}>
                <PointerCalculator
                  subjectName={subject.subjectName}
                  subjectCode={subject.subjectCode}
                  creditDistribution={subject.creditDistribution}
                  maxMarks={subject.maxMarks}
                  handleInputChange={handleInputChange}
                  structureType={subject.structureType}
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

export default Calculator;
