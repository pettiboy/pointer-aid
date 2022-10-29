import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import sumObject from "../../../../../utils/sumObject";
import PointerCalculator from "../../../../shared/PointerCalculator/PointerCalculator";
import PointerDisplay from "../../../../shared/PointerDisplay";
import kjsceItSem3CalculatorStructure from "./structure";

type Props = {};

const KjsceItSem3Calculator = (props: Props) => {
  const [sgpi, setSgpi] = useState(0);

  const [cgs, setCgs] = useState<StringNumberObject>({});

  const totalCredits = 22;

  useEffect(() => {
    const avg = sumObject(cgs) / totalCredits;
    const pointer = Math.round((avg + Number.EPSILON) * 100) / 100;
    setSgpi(pointer);
  }, [cgs]);

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
      <Grid container spacing={6}>
        {kjsceItSem3CalculatorStructure.map((subject) => (
          <Grid item xs={12} md={6} lg={6} xl={4}>
            <PointerCalculator
              subjectName={subject.subjectName}
              subjectCode={subject.subjectCode}
              creditDistribution={subject.creditDistribution}
              handleInputChange={handleInputChange}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 10 }}></Box>

      <PointerDisplay pointer={sgpi} />
    </Box>
  );
};

export default KjsceItSem3Calculator;
