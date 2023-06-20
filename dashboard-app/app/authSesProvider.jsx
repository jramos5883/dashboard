"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthSesProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
