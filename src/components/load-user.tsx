"use client";

import { ReactNode, useEffect } from "react";
import { useUser } from "@/libs/hooks/user-user";

const LoadUser = ({
  userData,
  children,
}: {
  children: ReactNode;
  userData: any;
}) => {
  const { user, updateUser } = useUser();

  // handle update user
  const handleUpdateUser = () => {
    updateUser(userData);
  };

  // update user on mount
  useEffect(() => {
    handleUpdateUser();
  }, [user]);

  return <>{children}</>;
};

export default LoadUser;
