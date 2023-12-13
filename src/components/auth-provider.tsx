"use client";

import { SessionProvider } from "next-auth/react";
import { AuthzProvider } from "@/components/authz-provider";
import { permissions } from "@/libs/types/permissions";
import React from "react";

const AuthProvider = ({ children }: any) => {
  return (
    <SessionProvider>
      <AuthzProvider permissions={permissions}>{children}</AuthzProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
