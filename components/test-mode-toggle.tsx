"use client";

import { TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthMode } from "@/hooks/use-auth-mode";

export const TestModeToggle = () => {
  const { isTestMode, toggleTestMode } = useAuthMode();

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <Button
      variant={isTestMode ? "default" : "outline"}
      size="sm"
      onClick={toggleTestMode}
      className="fixed bottom-4 right-4 z-50"
    >
      <TestTube className="h-4 w-4 mr-2" />
      {isTestMode ? "Test Mode ON" : "Test Mode OFF"}
    </Button>
  );
};