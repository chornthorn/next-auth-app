"use client";

import { useUser } from "@/libs/hooks/user-user";

const Page = () => {
  const { user, updateUser } = useUser();

  console.log("user", user);

  return (
    <div>
      <h1>My Client</h1>
      <br />
      {user && (
        <div>
          <p>id: {user.id}</p>
          <p>email: {user.email}</p>
          <p>role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
