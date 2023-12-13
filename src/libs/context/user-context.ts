import { createContext } from "react";
import { User } from "@/libs/types/user";

interface UserContextProps {
  user: User | null;
  updateUser: (newUser: User) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {},
});
