import Calculator from "../screens/Calculator/Calculator";
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
];

export default router;
