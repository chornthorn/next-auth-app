import { useContext } from "react";
import { AuthzContext } from "@/libs/context/authz-context";
import { Scope } from "@/libs/types/permissions";

interface PermissionOptions {
  resource: string;
  scope: Scope[];
}

type PermissionResult = { [K in Scope]?: boolean };

export function usePermission({ resource, scope }: PermissionOptions) {
  const { permissions } = useContext(AuthzContext);

  const userScopes = permissions?.permissions[resource] || [];

  return scope.reduce((acc, perm) => {
    acc[perm] = userScopes.includes(perm);
    return acc;
  }, {} as PermissionResult);
}
