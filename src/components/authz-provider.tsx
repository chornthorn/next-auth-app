"use client";

import { ReactNode } from "react";
import { AuthzContext } from "@/libs/context/authz-context";
import { Permissions } from "@/libs/types/permissions";

interface AuthzProviderProps {
  children: ReactNode;
  permissions: Permissions;
}

export function AuthzProvider({ children, permissions }: AuthzProviderProps) {
  return (
    <AuthzContext.Provider value={{ permissions }}>
      {children}
    </AuthzContext.Provider>
  );
}
