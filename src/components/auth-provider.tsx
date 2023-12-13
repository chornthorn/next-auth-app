"use client";

import { SessionProvider } from "next-auth/react";
import { AuthzProvider } from "@/components/authz-provider";
import { permissions } from "@/libs/types/permissions";
import React from "react";
import { UserProvider } from "@/components/user-provider";

const AuthProvider = ({ children }: any) => {
  return (
    <SessionProvider>
      <UserProvider>
        <AuthzProvider permissions={permissions}>{children}</AuthzProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
