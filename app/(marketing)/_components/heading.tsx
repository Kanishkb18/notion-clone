"use client";

import { SignUpButton } from "@clerk/clerk-react";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

import { useAuthMode } from "@/hooks/use-auth-mode";
import { useCurrentUser } from "@/components/auth-wrapper";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { links } from "@/config";

export const Heading = () => {
  const { user, isLoaded } = useCurrentUser();
  const { isTestMode } = useAuthMode();
  
  const isAuthenticated = !!user;
  const isLoading = !isLoaded;

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, &amp; Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>

      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <div className="flex items-center justify-center">
        {isLoading && <Spinner size="lg" />}

        {isAuthenticated && !isLoading && (
          <Button asChild>
            <Link href="/documents">
              Enter Jotion
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}

        {!isAuthenticated && !isLoading && (
          <>
            {isTestMode ? (
              <Button asChild>
                <Link href="/documents">
                  Enter Jotion (Test Mode) <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button>
                  Get Jotion free <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </SignUpButton>
            )}
          </>
        )}

        <Button variant="link" asChild>
          <Link
            href={links.sourceCode}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github className="h-4 w-4 mr-2" />
            Source Code
          </Link>
        </Button>
      </div>
    </div>
  );
};
