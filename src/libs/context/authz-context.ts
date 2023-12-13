import { createContext } from "react";
import { Permissions } from "@/libs/types/permissions";

interface AuthzContextProps {
  permissions: Permissions | null;
}

export const AuthzContext = createContext<AuthzContextProps>({
  permissions: null,
});
