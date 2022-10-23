import { createBrowserRouter } from "react-router-dom";
import KjsceScreen from "../components/kjsce/KjsceScreen";

// IT - sem 3
import KjsceItSem3Screen from "../components/kjsce/it/sem3/KjsceItSem3Screen";
import KjsceItSem3Calculator from "../components/kjsce/it/sem3/calculator/KjsceItSem3Calculator";

// comps - sem 5
import KjsceCompsSem5Screen from "../components/kjsce/comps/sem5/KjsceCompsSem5Screen";
import KjsceCompsSem5Calculator from "../components/kjsce/comps/sem5/calculator/KjsceCompsSem5Calculator";

const router = createBrowserRouter([
  {
    path: "/kjsce",
    element: <KjsceScreen />,
  },

  // IT
  // sem3
  {
    path: "/kjsce/it/sem3",
    element: <KjsceItSem3Screen />,
  },
  {
    path: "/kjsce/it/sem3/calculator",
    element: <KjsceItSem3Calculator />,
  },

  // COMPS
  // sem5
  {
    path: "/kjsce/comps/sem5",
    element: <KjsceCompsSem5Screen />,
  },
  {
    path: "/kjsce/comps/sem5/calculator",
    element: <KjsceCompsSem5Calculator />,
  },
]);

export default router;
