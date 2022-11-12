import KjsceScreen from "../components/kjsce/KjsceScreen";

// IT - sem 3
import KjsceItSem3Screen from "../components/kjsce/it/sem3/KjsceItSem3Screen";

// comps - sem 5
import KjsceCompsSem5Screen from "../components/kjsce/comps/sem5/KjsceCompsSem5Screen";
import KjsceItScreen from "../components/kjsce/it/KjsceItScreen";
import KjsceCompsScreen from "../components/kjsce/comps/KjsceCompsScreen";
import Calculator from "../screens/Calculator/Calculator";

const router = [
  {
    path: "/",
    element: <KjsceScreen />,
  },

  {
    path: "/:college/:branch/:semester/calculator",
    element: <Calculator />,
  },

  // college
  {
    path: "/kjsce",
    element: <KjsceScreen />,
  },

  // IT
  {
    path: "/kjsce/it",
    element: <KjsceItScreen />,
  },
  // sem3
  {
    path: "/kjsce/it/sem3",
    element: <KjsceItSem3Screen />,
  },

  // COMPS
  {
    path: "/kjsce/comps",
    element: <KjsceCompsScreen />,
  },
  // sem5
  {
    path: "/kjsce/comps/sem5",
    element: <KjsceCompsSem5Screen />,
  },
];

export default router;
