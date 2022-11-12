import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useLocationEffect(callback: (location: RouterLocation) => any) {
  const location = useLocation();

  useEffect(() => {
    callback(location);
  }, [location, callback]);
}
