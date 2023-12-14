"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function Page() {
  // const [user, setUser] = useState(null);
  //
  // const { data: session }: any = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     signIn("keycloak", { callbackUrl: "/" });
  //   },
  // });

  // useEffect(() => {
  //   // redirect to previous page if user is already logged in
  //   if (session) {
  //     redirect("/");
  //   } else {
  //     setUser(null);
  //   }
  // }, [session]);

  return (
    <div>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col items-center justify-center mt-12">
        <Button
          onClick={() => signIn("keycloak", { callbackUrl: "/" })}
          className="w-56"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
