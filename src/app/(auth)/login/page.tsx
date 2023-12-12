"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState(null);

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      signIn("keycloak", { callbackUrl: "/" });
    },
  });

  useEffect(() => {
    // redirect to previous page if user is already logged in
    if (session) {
      redirect("/");
    } else {
      setUser(null);
    }
  }, [session]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
