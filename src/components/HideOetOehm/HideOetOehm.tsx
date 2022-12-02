import {
  FormControlLabel,
  Checkbox,
  MenuItem,
  Menu,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import SettingsIcon from "@mui/icons-material/Settings";

type Props = {};

const HideOetOehm = (props: Props) => {
  const { setDisableSubjectIds } = useContext(CalculatorContext);

  const [oet, setOet] = useState(true);
  const [oehm, setOehm] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onChange = (subjectCode: string, checked: boolean) => {
    if (subjectCode === "OET") {
      setOet((prev) => !prev);
    } else if (subjectCode === "OEHM") {
      setOehm((prev) => !prev);
    }

    if (checked === true) {
      // remove subject from disabled subject ids
      setDisableSubjectIds((prev) => {
        const updatedArr = [...prev];

        const index = updatedArr.indexOf(subjectCode);
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
      // add subject to disabled subject ids
      setDisableSubjectIds((prev) => {
        const index = prev.indexOf(subjectCode);
        // array item is not found
        if (index <= -1) {
          return [...prev, subjectCode];
        } else {
          return prev;
        }
      });
    }
  };

  const onChangeOet = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onChange("OET", checked);
  };

  const onChangeOehm = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onChange("OEHM", checked);
  };

  return (
    <>
      <IconButton
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleIconClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        anchorEl={anchorEl}
        disableScrollLock={true}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <FormControlLabel
            control={<Checkbox checked={oet} onChange={onChangeOet} />}
            label="OET"
          />
        </MenuItem>
        <Divider />
        <MenuItem>
          <FormControlLabel
            control={<Checkbox checked={oehm} onChange={onChangeOehm} />}
            label="OEHM"
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default HideOetOehm;
