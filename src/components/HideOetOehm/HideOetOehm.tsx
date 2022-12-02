import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";

type Props = {};

const HideOetOehm = (props: Props) => {
  const { setDisableSubjectIds } = useContext(CalculatorContext);

  const [oet, setOet] = useState(true);
  const [oehm, setOehm] = useState(true);

  useEffect(() => {}, [oet, oehm]);

  const onChangeOet = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setOet((prev) => !prev);

    if (checked === true) {
      // remove OET from disabled subject ids
      setDisableSubjectIds((prev) => {
        const updatedArr = [...prev];

        const index = updatedArr.indexOf("OET");
        // array item is found
        if (index > -1) {
          updatedArr.splice(index, 1);
          return updatedArr;
        } else {
          return prev;
        }
      });
    }
    if (checked === false) {
      setDisableSubjectIds((prev) => {
        const index = prev.indexOf("OET");
        // array item is not found
        if (index <= -1) {
          return [...prev, "OET"];
        } else {
          return prev;
        }
      });
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={oet} onChange={onChangeOet} />}
        label="OET"
      />
      <FormControlLabel
        control={
          <Checkbox checked={oehm} onChange={() => setOehm((prev) => !prev)} />
        }
        label="OEHM"
      />
    </FormGroup>
  );
};

export default HideOetOehm;
