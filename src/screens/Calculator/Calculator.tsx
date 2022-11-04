import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PointerCalculator from "../../components/shared/PointerCalculator/PointerCalculator";
import PointerDisplay from "../../components/shared/PointerDisplay";
import calculatorStructure from "../../data/calculatorStructure";
import sumObject from "../../utils/sumObject";

type Props = {};

const Calculator = (_props: Props) => {
  const { college, branch, semester } = useParams();

  const [key, setKey] = useState<string>();

  const [sgpi, setSgpi] = useState(0);

  const [cgs, setCgs] = useState<StringNumberObject>({});

  const [totalCredits, setTotalCredits] = useState<number>();

  useEffect(() => {
    const givenKey = `${college}_${branch}_${semester}`;
    if (givenKey in calculatorStructure) {
      setKey(givenKey);
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
      {key ? (
        <>
          <Grid container spacing={6}>
            {calculatorStructure[key].map((subject) => (
              <Grid key={subject.subjectCode} item xs={12} md={6} lg={6} xl={4}>
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

          <Box sx={{ mb: 10 }}></Box>

          <PointerDisplay pointer={sgpi} />
        </>
      ) : (
        <h2>No calculator for available yet</h2>
      )}
    </Box>
  );
};

export default Calculator;
