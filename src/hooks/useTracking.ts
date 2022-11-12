import { useLocationEffect } from "./useLocationEffect";

export const useTracking = (
  trackingId: string | undefined = process.env.REACT_APP_GA_MEASUREMENT_ID
) => {
  useLocationEffect((location: RouterLocation) => {
    if (!window.gtag) {
      console.info("window.gtag not found.");
      return;
    }
    if (!trackingId) {
      console.info(
        "Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`."
      );
      return;
    }

    window.gtag("set", "page_path", { page_path: location.pathname });
    window.gtag("event", "page_view");
  });
};
