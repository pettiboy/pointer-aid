import { Box } from "@mui/material";
import { useState } from "react";
import { TextField } from "../TextField/TextField";

type Props = {
  credits: number;
  label: string;
  onUpdateCallback: (value: number) => void;
};

const CgpaContainer = ({ credits, label }: Props) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Box>
      <TextField
        inputProps={{ value: value ? value : "" }}
        label={label}
        maxMarks={10}
        onChangeCallback={(val) => {
          setValue(val.toString());
        }}
      />
    </Box>
  );
};

export default CgpaContainer;
