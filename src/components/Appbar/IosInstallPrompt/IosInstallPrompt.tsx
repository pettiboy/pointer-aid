import { useCallback } from "react";

type Props = {};

const IosInstallPrompt = (props: Props) => {
  const isIos = useCallback(() => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }, [navigator]);

  const isInstalledOnIos = useCallback(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return true;
    }
    // if ("standalone" in window.navigator) {
    //   return window.navigator.standalone === true;
    // } else {
    //   return false;
    // }
  }, [navigator]);

  return isIos() ? <div>IosInstallPrompt</div> : null;
};

export default IosInstallPrompt;
