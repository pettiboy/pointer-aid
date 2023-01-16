import {
  FormControlLabel,
  Checkbox,
  MenuItem,
  Menu,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CalculatorContext } from "../../context/CalculatorContext";
import SettingsIcon from "@mui/icons-material/Settings";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { useParams } from "react-router-dom";

type Props = {};

const HideOetOehm = (props: Props) => {
  const { college, branch, semester } = useParams();

  const { setDisableSubjectIds, calculatorData } =
    useContext(CalculatorContext);

  const [showComponent, setShowComponent] = useState(false);

  // TODO: check performance of localStorage being read on every render
  const localStorageOetValue = localStorage.getItem(
    `${college}_${branch}_${semester}_show_OET`
  );
  const localStorageOehmValue = localStorage.getItem(
    `${college}_${branch}_${semester}_show_OEHM`
  );

  // default values return null or "true" | "false"
  // if null by default then set default oet oehm show values to true
  // else follow localStorage values
  const [oet, setOet] = useState(
    localStorageOetValue ? localStorageOetValue === "true" : true
  );
  const [oehm, setOehm] = useState(
    localStorageOehmValue ? localStorageOehmValue === "true" : true
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    // ASSUMPTION: if oehm is present oet is assumed
    const isOetPresent = calculatorData?.findIndex(
      (subject) => subject.subjectCode === "OET"
    );

    if (isOetPresent === -1) {
      setShowComponent(false);
    } else {
      setShowComponent(true);
    }
  }, [calculatorData]);

  useEffect(() => {
    // if by default showOet or showOehm is false then
    // explicitly set it to false to update filtered data
    if (oet === false) {
      updateDisableSubjectIds("OET", oet);
    }
    if (oehm === false) {
      updateDisableSubjectIds("OEHM", oehm);
    }
  }, []);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_show_OET`,
      oet.toString()
    );
  }, [oet]);

  useEffect(() => {
    asyncLocalStorage.setItem(
      `${college}_${branch}_${semester}_show_OEHM`,
      oehm.toString()
    );
  }, [oehm]);

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const updateDisableSubjectIds = (subjectCode: string, checked: boolean) => {
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

  const onClickOetMenuItem = () => {
    setOet((prev) => {
      updateDisableSubjectIds("OET", !prev);
      return !prev;
    });
  };

  const onChangeOet = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setOet(checked);
    updateDisableSubjectIds("OET", checked);
  };

  const onClickOehmMenuItem = () => {
    setOehm((prev) => {
      updateDisableSubjectIds("OEHM", !prev);
      return !prev;
    });
  };

  const onChangeOehm = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setOehm(checked);
    updateDisableSubjectIds("OEHM", checked);
  };

  return (
    <>
      {showComponent && (
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
            <MenuItem onClick={onClickOetMenuItem}>
              <FormControlLabel
                control={<Checkbox checked={oet} onChange={onChangeOet} />}
                label="OET"
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={onClickOehmMenuItem}>
              <FormControlLabel
                control={<Checkbox checked={oehm} onChange={onChangeOehm} />}
                label="OEHM"
              />
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default HideOetOehm;
