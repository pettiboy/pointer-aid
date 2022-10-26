import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import calculatePointer from "../../utils/calculatePointer";
import { Slider } from "@mui/material";
import calculateMarks from "../../utils/calculateMarks";

type Props = {
  subject: string;
  onUpdateCallback(cg: number): void;
};

const Pointer300 = ({ subject, onUpdateCallback }: Props) => {
  const [res, setRes] = useState(4);

  const [ise, setIse] = useState(0);
  const [ia, setIa] = useState(0);
  const [ese, setEse] = useState(0);

  const [fixIse, setFixIse] = useState(false);
  const [fixIa, setFixIa] = useState(false);

  useEffect(() => {
    onUpdateCallback(res * 3);
  }, [res]);

  useEffect(() => {
    setRes(calculatePointer(ise + ia + ese / 2, 100));
  }, [ise, ia, ese]);

  const handleMarksChange = (pointer: number) => {
    if (fixIse === true && fixIa === true) updateMarksIseIaFixed(pointer);
    else if (fixIse === true) updateMarksIseFixed(pointer);
    else updateMarks(pointer);
  };

  const updateMarks = (pointer: number) => {
    let totalReq = calculateMarks(pointer, 100);

    let eseMarksLimit = calculateMarks(pointer, 50);
    let iaMarksLimit = calculateMarks(pointer, 20);
    let iseMarksLimit = calculateMarks(pointer, 30);

    let updateEse = 0;
    let updateIa = 0;
    let updateIse = 0;

    if (totalReq > eseMarksLimit) {
      // set ese to max limit
      updateEse += eseMarksLimit * 2;

      // pass on req to lower exams
      totalReq = totalReq - eseMarksLimit;

      if (totalReq > iaMarksLimit) {
        // set ia to max limit
        updateIa += iaMarksLimit;
        // pass on req to lower exams
        totalReq = totalReq - iaMarksLimit;

        if (totalReq > iseMarksLimit) {
          updateIse += iseMarksLimit;
        } else {
          updateIse += totalReq;
        }
      } else {
        updateIa += totalReq;
        updateIse += 0;
      }
    } else {
      updateEse += totalReq * 2;
      updateIa += 0;
      updateIse += 0;
    }

    setEse(updateEse);
    setIa(updateIa);
    setIse(updateIse);
  };

  const updateMarksIseFixed = (pointer: number) => {
    let totalReq = calculateMarks(pointer, 100) - ise;
    let eseMarksLimit = calculateMarks(pointer, 50);
    let iaMarksLimit = calculateMarks(pointer, 20);

    let updateEse = 0;
    let updateIa = 0;

    let count = 0;

    while (totalReq > 0 && count < 5) {
      if (totalReq > eseMarksLimit) {
        // set updateEse to max limit
        updateEse += eseMarksLimit * 2;

        // pass on req to lower exams
        totalReq = totalReq - eseMarksLimit;

        if (totalReq > iaMarksLimit) {
          // set ia to existing limit
          updateIa += iaMarksLimit;

          // pass on req to next iteration with higher limits
          totalReq = totalReq - iaMarksLimit;

          // maximise limits
          eseMarksLimit = Math.abs(50 - updateEse / 2);
          iaMarksLimit = Math.abs(20 - updateIa);
        } else {
          updateIa += totalReq;

          break;
        }
      } else {
        updateEse += totalReq * 2;
        updateIa += 0;

        break;
      }

      count++;
    }

    setEse(updateEse);
    setIa(updateIa);
  };

  const updateMarksIseIaFixed = (pointer: number) => {
    let totalReq = calculateMarks(pointer, 100) - ise - ia;
    let eseMarksLimit = calculateMarks(pointer, 50);

    let updateEse = 0;

    let count = 0;

    while (totalReq > 0 && count < 5) {
      if (totalReq > eseMarksLimit) {
        // set updateEse to existing limit
        updateEse += eseMarksLimit * 2;

        // pass on req to next iteration with higher limits
        totalReq = totalReq - eseMarksLimit;

        // maximise limits
        eseMarksLimit = Math.abs(50 - updateEse / 2);
      } else {
        updateEse += totalReq * 2;

        break;
      }

      count++;
    }

    setEse(updateEse);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography sx={{ mb: 3 }} variant="h4">
        {subject}
      </Typography>
      <TextField
        label="ISE"
        value={ise.toString()}
        onChange={(e) => setIse(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={fixIse}
            onChange={(_e, checked) => {
              if (checked === false) setFixIa(false);
              setFixIse(checked);
            }}
          />
        }
        label="Fix ISE marks"
      />

      <TextField
        label="IA"
        value={ia.toString()}
        onChange={(e) => setIa(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />
      <FormControlLabel
        control={
          <Switch
            checked={fixIa}
            onChange={(_e, checked) => {
              if (checked === true) setFixIse(true);
              setFixIa(checked);
            }}
          />
        }
        label="Fix IA marks"
      />

      <TextField
        label="ESE"
        value={ese.toString()}
        onChange={(e) => setEse(Number(e.target.value))}
        type="number"
        sx={{ mr: 2, mb: 2 }}
      />

      <Box>
        <Typography>Grade Pointer (G): {res}</Typography>
        <Slider
          sx={{ width: "80vw" }}
          min={4}
          step={1}
          max={10}
          value={res}
          onChange={(e, num) => {
            handleMarksChange(Number(num));
          }}
          defaultValue={9}
        />
      </Box>
    </Box>
  );
};

export default Pointer300;
