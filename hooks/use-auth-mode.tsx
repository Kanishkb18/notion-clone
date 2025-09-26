import { useEffect, useState } from "react";

export const useAuthMode = () => {
  const [isTestMode, setIsTestMode] = useState(false);

  useEffect(() => {
    // Check if we're in development and test mode is enabled
    const testMode = process.env.NODE_ENV === "development" && 
                    (process.env.NEXT_PUBLIC_TEST_MODE === "true" || 
                     localStorage.getItem("test-mode") === "true");
    setIsTestMode(testMode);
  }, []);

  const toggleTestMode = () => {
    const newMode = !isTestMode;
    setIsTestMode(newMode);
    localStorage.setItem("test-mode", newMode.toString());
    window.location.reload(); // Reload to apply changes
  };

  return {
    isTestMode,
    toggleTestMode,
  };
};