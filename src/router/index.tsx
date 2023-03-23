import Calculator from "../screens/Calculator/Calculator";
import CgpaCalculator from "../screens/CgpaCalculator/CgpaCalculator";
import KjsceHome from "../screens/KjsceHome/KjsceHome";

const router = [
  // homepage
  {
    path: "/",
    element: <KjsceHome />,
  },
  // college
  {
    path: "/kjsce",
    element: <KjsceHome />,
  },

  // calculator
  {
    path: "/:college/:branch/:semester/calculator",
    element: <Calculator />,
  },

  // cgpacalculator
  {
    path: "/:college/:branch/cgpa",
    element: <CgpaCalculator />,
  },
];

export default router;
