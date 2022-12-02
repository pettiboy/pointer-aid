import { Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar/Appbar";
import { useTracking } from "./hooks/useTracking";
import router from "./router";

function App() {
  useTracking();

  return (
    <>
      <Appbar />

      <Routes>
        {router.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
