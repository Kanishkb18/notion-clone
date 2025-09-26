import { useEffect, useState } from "react";

export type DefaultUser = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddresses: Array<{ emailAddress: string }>;
  imageUrl: string;
};

const DEFAULT_TEST_USER: DefaultUser = {
  id: "test-user-123",
  firstName: "Test",
  lastName: "User",
  fullName: "Test User",
  emailAddresses: [{ emailAddress: "test@example.com" }],
  imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};

export const useDefaultUser = () => {
  const [user, setUser] = useState<DefaultUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay like real auth
    const timer = setTimeout(() => {
      setUser(DEFAULT_TEST_USER);
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    isLoaded,
    isSignedIn: !!user,
  };
};