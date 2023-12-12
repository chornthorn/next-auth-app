import { createContext, useContext } from "react";
import { Scope, User } from "@/libs/types/user";

interface UserContextProps {
  user: User | null;
}

export const UserContext = createContext<UserContextProps>({ user: null });

interface PermissionOptions {
  resource: string;
  scope: Scope[];
}

type PermissionResult = { [K in Scope]?: boolean };

export function usePermission({ resource, scope }: PermissionOptions) {
  const { user } = useContext(UserContext);

  const userScopes = user?.permissions[resource] || [];

  return scope.reduce((acc, perm) => {
    acc[perm] = userScopes.includes(perm);
    return acc;
  }, {} as PermissionResult);
}
