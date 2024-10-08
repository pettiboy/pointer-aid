import { Box } from "@mui/material";
import Pointer010 from "../PointerContainers/Pointer010";
import Pointer010_75 from "../PointerContainers/Pointer010_75";
import Pointer011 from "../PointerContainers/Pointer011";
import Pointer012 from "../PointerContainers/Pointer012";
import Pointer020 from "../PointerContainers/Pointer020";
import Pointer020_50 from "../PointerContainers/Pointer020_50";
import Pointer020_50b from "../PointerContainers/Pointer020_50b";
import Pointer030 from "../PointerContainers/Pointer030";
import Pointer030_75 from "../PointerContainers/Pointer030_75";
import Pointer102 from "../PointerContainers/Pointer102";
import Pointer110_50 from "../PointerContainers/Pointer110_50";
import Pointer110_75 from "../PointerContainers/Pointer110_75";
import Pointer200 from "../PointerContainers/Pointer200";
import Pointer300 from "../PointerContainers/Pointer300";
import Pointer301 from "../PointerContainers/Pointer301";
import Pointer040 from "../PointerContainers/Pointer040";

interface Props extends PointerCalculatorStructureType {
  handleInputChange: (name: string, value: number) => void;
}

const PointerCalculator = ({
  subjectName,
  subjectCode,
  creditDistribution,
  maxMarks,
  structureType,
  handleInputChange,
}: Props) => {
  return (
    <Box sx={{ height: "100%" }}>
      {
        {
          "010":
            maxMarks === 75 ? (
              <Pointer010_75
                subjectCode={subjectCode}
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ) : (
              <Pointer010
                subjectCode={subjectCode}
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ),
          "011": (
            <Pointer011
              subjectCode={subjectCode}
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "012": (
            <Pointer012
              subjectCode={subjectCode}
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              maxMarks={maxMarks}
            />
          ),
          "020":
            maxMarks === 50 ? (
              structureType === "b" ? (
                <Pointer020_50b
                  subjectCode={subjectCode}
                  subject={subjectName}
                  onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
                />
              ) : (
                <Pointer020_50
                  subjectCode={subjectCode}
                  subject={subjectName}
                  onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
                />
              )
            ) : (
              <Pointer020
                subjectCode={subjectCode}
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
                maxMarks={maxMarks}
              />
            ),
          "030":
            maxMarks === 75 ? (
              <Pointer030_75
                subjectCode={subjectCode}
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
                maxMarks={maxMarks}
              />
            ) : (
              <Pointer030
                subjectCode={subjectCode}
                subject={subjectName}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ),
          "040": (
            <Pointer040
              subjectCode={subjectCode}
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "102": (
            <Pointer102
              subjectCode={subjectCode}
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "110":
            maxMarks === 50 ? (
              <Pointer110_50
                subject={subjectName}
                subjectCode={subjectCode}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ) : (
              <Pointer110_75
                subject={subjectName}
                subjectCode={subjectCode}
                onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
              />
            ),
          "200": (
            <Pointer200
              subject={subjectName}
              subjectCode={subjectCode}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "300": (
            <Pointer300
              subject={subjectName}
              subjectCode={subjectCode}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "301": (
            <Pointer301
              subject={subjectName}
              subjectCode={subjectCode}
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
