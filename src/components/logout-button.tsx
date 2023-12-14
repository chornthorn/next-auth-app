"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

async function logout() {
  const response = await fetch("/api/auth/logout", {
    method: "GET",
  });
  return await response.json();
}

const Page = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const asyncSignOut = async () => {
      if (
        status !== "loading" &&
        session &&
        session?.error === "RefreshAccessTokenError"
      ) {
        await signOut({ callbackUrl: "/" });
      }
    };

    asyncSignOut();
  }, [session, status]);

  const handleLogOut = () => {
    logout().then(() => {
      signOut({ callbackUrl: "/" });
    });
  };

  return (
    <>
      <DropdownMenuItem onClick={handleLogOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  );
};

export default Page;
