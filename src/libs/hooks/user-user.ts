import { useContext } from "react";
import { UserContext } from "@/libs/context/user-context";

export function useUser() {
  const { user, updateUser } = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return { user, updateUser };
}
