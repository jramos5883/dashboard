"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Image
          className="rounded-[10px] cursor-pointer"
          src={session.user?.image ?? "/mememan.webp"}
          width={50}
          height={50}
          alt="Your Name"
        />
      </Link>
    );
  }

  return (
    <button
      className="p-4"
      onClick={() => signIn("credentials", { callbackUrl: "/dashboard" })}
    >
      Sign in
    </button>
  );
}

export function SignOutButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "authenticated") {
    return (
      <button className="p-4" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </button>
    );
  }
}
