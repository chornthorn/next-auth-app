"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const clientSession = useSession();

  console.log("clientSession", clientSession);

  return (
    <div>
      <h1>Page</h1>
      <p>Client page</p>
      {JSON.stringify(clientSession, null, 2)}
    </div>
  );
}
