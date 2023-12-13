import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth-provider";
import LoadUser from "@/components/load-user";
import { syncUser } from "@/libs/services/auth-service";
import React, { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const user = await syncUser();

  return (
    <html lang="en">
      {/*<AuthProvider>*/}
      {/*  <LoadUser*/}
      {/*    userData={{*/}
      {/*      id: user?.data.id,*/}
      {/*      email: user?.data.email,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <body className={inter.className}>{children}</body>*/}
      {/*  </LoadUser>*/}
      {/*</AuthProvider>*/}

      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
