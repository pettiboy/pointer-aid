import Pointer010 from "../Pointer010";
import Pointer011 from "../Pointer011";
import Pointer110_50 from "../Pointer110_50";
import Pointer110_75 from "../Pointer110_75";
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
    <div>
      {
        {
          "301": (
            <Pointer301
              subject={subjectName}
              onUpdateCallback={(th, tw) => {
                handleInputChange(subjectCode + "TH", th);
                handleInputChange(subjectCode + "TW", tw);
              }}
            />
          ),
          "300": (
            <Pointer300
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
          "011": (
            <Pointer011
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
          "010": (
            <Pointer010
              subject={subjectName}
              onUpdateCallback={(cg) => handleInputChange(subjectCode, cg)}
            />
          ),
        }[creditDistribution]
      }
    </div>
  );
};

export default PointerCalculator;
