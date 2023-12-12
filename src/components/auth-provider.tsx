"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/components/user-provider";
import { user } from "@/libs/types/user";

const AuthProvider = ({ children }: any) => {
  return (
    <SessionProvider>
      <UserProvider user={user}>{children}</UserProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
