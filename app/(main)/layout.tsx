"use client";

import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { AuthWrapper } from "@/components/auth-wrapper";
import { SearchCommand } from "@/components/search-command";

import { Navigation } from "./_components/navigation";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthWrapper fallback={<div>{redirect("/")}</div>}>
      <div className="h-full flex dark:bg-[#1F1F1F]">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">
          <SearchCommand />
          {children}
        </main>
      </div>
    </AuthWrapper>
  );
};

export default MainLayout;
