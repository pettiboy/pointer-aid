import { createBrowserRouter } from "react-router-dom";
import KjsceScreen from "../components/kjsce/KjsceScreen";
import KjsceSem3CalculatorScreen from "../components/kjsce/sem3/calculator/KjsceSem3CalculatorScreen";
import KjsceSem3Screen from "../components/kjsce/sem3/KjsceSem3Screen";
import KjsceSem5CalculatorScreen from "../components/kjsce/sem5/calculator/KjsceSem5CalculatorScreen";
import KjsceSem5Screen from "../components/kjsce/sem5/KjsceSem5Screen";

const router = createBrowserRouter([
  {
    path: "/kjsce",
    element: <KjsceScreen />,
  },
  {
    path: "/kjsce/sem3",
    element: <KjsceSem3Screen />,
  },
  {
    path: "/kjsce/sem3/calculator",
    element: <KjsceSem3CalculatorScreen />,
  },
  {
    path: "/kjsce/sem5",
    element: <KjsceSem5Screen />,
  },
  {
    path: "/kjsce/sem5/calculator",
    element: <KjsceSem5CalculatorScreen />,
  },
]);

export default router;
