import { Box } from "@mui/material";
import Pointer010 from "../Pointer010";
import Pointer011 from "../Pointer011";
import Pointer012 from "../Pointer012";
import Pointer020_50 from "../Pointer020_50";
import Pointer020_75 from "../Pointer020_75";
import Pointer030 from "../Pointer030";
import Pointer102 from "../Pointer102";
import Pointer110_50 from "../Pointer110_50";
import Pointer110_75 from "../Pointer110_75";
import Pointer200 from "../Pointer200";
import Pointer300 from "../Pointer300";
import Pointer301 from "../Pointer301";

interface Props extends PointerCalculatorStructureType {
  handleInputChange: (name: string, value: number) => void;
}

const PointerCalculator = ({
  subjectName,
  subjectCode,
  creditDistribution,
  maxMarks,

  handleInputChange,
}: Props) => {
  return (
    <Box sx={{ height: "100%" }}>
      {
        {
          "010": (
            <Pointer010
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "011": (
            <Pointer011
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "012": (
            <Pointer012
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              maxMarks={maxMarks}
            />
          ),
          "020":
            maxMarks === 75 ? (
              <Pointer020_75
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ) : (
              <Pointer020_50
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ),
          "030": (
            <Pointer030
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "102": (
            <Pointer102
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "110":
            maxMarks === 50 ? (
              <Pointer110_50
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ) : (
              <Pointer110_75
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ),
          "200": (
            <Pointer200
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "300": (
            <Pointer300
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "301": (
            <Pointer301
              subject={subjectName}
              onUpdateCallback={(th, tw) => {
                handleInputChange(subjectCode + "TH", th);
                handleInputChange(subjectCode + "TW", tw);
              }}
            />
          ),
        }[creditDistribution]
      }
    </Box>
  );
};

export default PointerCalculator;
