"use client";

import React, { ReactNode } from "react";
import { UserContext } from "@/libs/hooks/use-permission";
import { User } from "@/libs/types/user";

interface UserProviderProps {
  children: ReactNode;
  user: User;
}

export function UserProvider({ children, user }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
