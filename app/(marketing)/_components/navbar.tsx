"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

import { useAuthMode } from "@/hooks/use-auth-mode";
import { useCurrentUser } from "@/components/auth-wrapper";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";

export const Navbar = () => {
  const { user, isLoaded } = useCurrentUser();
  const { isTestMode } = useAuthMode();
  const scrolled = useScrollTop();
  
  const isAuthenticated = !!user;
  const isLoading = !isLoaded;

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            {!isTestMode && (
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
            )}

            {isTestMode ? (
              <Button size="sm" asChild>
                <Link href="/documents">Enter Jotion (Test Mode)</Link>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button size="sm">Get Jotion free</Button>
              </SignInButton>
            )}
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>

            {!isTestMode && <UserButton afterSignOutUrl="/" />}
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};
