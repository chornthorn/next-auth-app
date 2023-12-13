"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

async function logout() {
  const response = await fetch("/api/logout", {
    method: "GET",
  });
  if (!response.ok) {
    console.error("Logout failed");
  }

  return response;
}

const Page = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status !== "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (session) {
    return (
      <div>
        <p>
          <button
            onClick={() => {
              logout().then(() => {
                signOut({ callbackUrl: "/" });
              });
            }}
          >
            Logout
          </button>
        </p>
      </div>
    );
  }

  return (
    <>
      please sign in
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn("keycloak", { callbackUrl: "/" })}
      >
        Sign In
      </button>
    </>
  );
};

export default Page;
