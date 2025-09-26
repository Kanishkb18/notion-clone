"use client";

import { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { type PropsWithChildren } from "react";

import { useAuthMode } from "@/hooks/use-auth-mode";
import { useTestAuth } from "@/components/providers/test-auth-provider";
import { Spinner } from "@/components/spinner";

type AuthWrapperProps = PropsWithChildren<{
  fallback?: React.ReactNode;
}>;

export const AuthWrapper = ({ children, fallback }: AuthWrapperProps) => {
  const { isTestMode } = useAuthMode();
  const clerkAuth = useConvexAuth();
  const clerkUser = useUser();
  const testAuth = useTestAuth();

  // Use test auth in test mode, otherwise use Clerk
  const isAuthenticated = isTestMode ? testAuth.isSignedIn : clerkAuth.isAuthenticated;
  const isLoading = isTestMode ? !testAuth.isLoaded : clerkAuth.isLoading;
  const user = isTestMode ? testAuth.user : clerkUser.user;

  if (isLoading) {
    return fallback || (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  return <>{children}</>;
};

// Hook to get current user regardless of auth mode
export const useCurrentUser = () => {
  const { isTestMode } = useAuthMode();
  const clerkUser = useUser();
  const testAuth = useTestAuth();

  if (isTestMode) {
    return {
      user: testAuth.user,
      isLoaded: testAuth.isLoaded,
      isSignedIn: testAuth.isSignedIn,
    };
  }

  return {
    user: clerkUser.user,
    isLoaded: clerkUser.isLoaded,
    isSignedIn: clerkUser.isSignedIn,
  };
};