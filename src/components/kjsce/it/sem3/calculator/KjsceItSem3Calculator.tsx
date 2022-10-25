import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Pointer010 from "../../../../shared/Pointer010";
import Pointer011 from "../../../../shared/Pointer011";
import Pointer300 from "../../../../shared/Pointer300";
import Pointer301 from "../../../../shared/Pointer301";
import PointerDisplay from "../../../../shared/PointerDisplay";

type Props = {};

const KjsceItSem3Calculator = (props: Props) => {
  const [sgpi, setSgpi] = useState(0);

  // 301
  const [cgSub1Th, setCgSub1Th] = useState(0);
  const [cgSub1Tw, setCgSub1Tw] = useState(0);

  // 300
  const [cgSub2, setCgSub2] = useState(0);
  const [cgSub3, setCgSub3] = useState(0);
  const [cgSub4, setCgSub4] = useState(0);
  const [cgSub5, setCgSub5] = useState(0);

  // 011
  const [cgSub6, setCgSub6] = useState(0);

  // 010
  const [cgSub7, setCgSub7] = useState(0);
  const [cgSub8, setCgSub8] = useState(0);
  const [cgSub9, setCgSub9] = useState(0);
  const [cgSub10, setCgSub10] = useState(0);

  useEffect(() => {
    const avg =
      (cgSub1Th +
        cgSub1Tw +
        cgSub2 +
        cgSub3 +
        cgSub4 +
        cgSub5 +
        cgSub6 +
        cgSub7 +
        cgSub8 +
        cgSub9 +
        cgSub10) /
      27;
    const pointer = Math.round((avg + Number.EPSILON) * 100) / 100;
    setSgpi(pointer);
  }, [
    cgSub1Th,
    cgSub1Tw,
    cgSub2,
    cgSub3,
    cgSub4,
    cgSub5,
    cgSub6,
    cgSub7,
    cgSub8,
    cgSub9,
    cgSub10,
  ]);

  return (
    <Box sx={{ p: 5 }}>
      {/* 301 */}
      <Pointer301
        subject="Discrete and Applied Mathematics"
        onUpdateCallback={(th, tw) => {
          setCgSub1Th(th);
          setCgSub1Tw(tw);
        }}
      />

      {/* 300 */}
      <Pointer300
        subject="Data Structures"
        onUpdateCallback={(cg) => {
          setCgSub2(cg);
        }}
      />
      <Pointer300
        subject="Database Management Systems"
        onUpdateCallback={(cg) => {
          setCgSub3(cg);
        }}
      />
      <Pointer300
        subject="Digital Systems"
        onUpdateCallback={(cg) => {
          setCgSub4(cg);
        }}
      />
      <Pointer300
        subject="Data Communication and Networking"
        onUpdateCallback={(cg) => {
          setCgSub5(cg);
        }}
      />

      {/* 011 */}
      <Pointer011
        subject="Progamming Laboratory"
        onUpdateCallback={(cg) => {
          setCgSub6(cg);
        }}
      />

      {/* 010 */}
      <Pointer010
        subject="Data Structures Laboratory"
        onUpdateCallback={(cg) => {
          setCgSub7(cg);
        }}
      />
      <Pointer010
        subject="Database Management Systems Laboratory"
        onUpdateCallback={(cg) => {
          setCgSub8(cg);
        }}
      />
      <Pointer010
        subject="Digital Systems Laboratory"
        onUpdateCallback={(cg) => {
          setCgSub9(cg);
        }}
      />
      <Pointer010
        subject="Data Communication and Networking Laboratory"
        onUpdateCallback={(cg) => {
          setCgSub10(cg);
        }}
      />

      <Box sx={{ mb: 10 }}></Box>

      <PointerDisplay pointer={sgpi} />
    </Box>
  );
};

export default KjsceItSem3Calculator;
