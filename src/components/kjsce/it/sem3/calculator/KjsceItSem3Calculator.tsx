import { Box } from "@mui/material";
import Pointer010 from "../../../../shared/Pointer010";
import Pointer011 from "../../../../shared/Pointer011";
import Pointer300 from "../../../../shared/Pointer300";
import Pointer301 from "../../../../shared/Pointer301";

type Props = {};

const KjsceItSem3Calculator = (props: Props) => {
  return (
    <Box sx={{ p: 5 }}>
      {/* 301 */}
      <Pointer301 subject="Discrete and Applied Mathematics" />

      {/* 300 */}
      <Pointer300 subject="Data Structures" />
      <Pointer300 subject="Database Management Systems" />
      <Pointer300 subject="Digital Systems" />
      <Pointer300 subject="Data Communication and Networking" />

      {/* 011 */}
      <Pointer011 subject="Progamming Laboratory" />

      {/* 010 */}
      <Pointer010 subject="Data Structures Laboratory" />
      <Pointer010 subject="Database Management Systems Laboratory" />
      <Pointer010 subject="Digital Systems Laboratory" />
      <Pointer010 subject="Data Communication and Networking Laboratory" />
    </Box>
  );
};

export default KjsceItSem3Calculator;
