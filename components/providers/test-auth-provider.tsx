"use client";

import { createContext, useContext, type PropsWithChildren } from "react";
import { useDefaultUser, type DefaultUser } from "@/hooks/use-default-user";

type TestAuthContextType = {
  user: DefaultUser | null;
  isLoaded: boolean;
  isSignedIn: boolean;
};

const TestAuthContext = createContext<TestAuthContextType | undefined>(undefined);

export const TestAuthProvider = ({ children }: PropsWithChildren) => {
  const { user, isLoaded, isSignedIn } = useDefaultUser();

  return (
    <TestAuthContext.Provider value={{ user, isLoaded, isSignedIn }}>
      {children}
    </TestAuthContext.Provider>
  );
};

export const useTestAuth = () => {
  const context = useContext(TestAuthContext);
  if (context === undefined) {
    throw new Error("useTestAuth must be used within a TestAuthProvider");
  }
  return context;
};