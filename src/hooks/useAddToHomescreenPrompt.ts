import { useEffect, useState } from "react";

// credits : https://gist.github.com/rikukissa/cb291a4a82caa670d2e0547c520eae53
export function useAddToHomescreenPrompt(): [
  BeforeInstallPromptEvent | null,
  () => void
] {
  const [prompt, setState] = useState<BeforeInstallPromptEvent | null>(null);

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  useEffect(() => {
    const ready = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener("beforeinstallprompt", ready as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready as any);
    };
  }, []);

  return [prompt, promptToInstall];
}
