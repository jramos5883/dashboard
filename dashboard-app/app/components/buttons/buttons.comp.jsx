"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebase/firebase.utils";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  const createUserDoc = async () => {
    if (session) {
      const userRef = doc(db, "users", session.user?.uid);

      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
          uid: session.user?.uid,
        });
      }
    }
  };

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "authenticated") {
    createUserDoc();
  }

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Image
          className="rounded-[10px] cursor-pointer"
          src={session.user?.image ?? "/mememan.webp"}
          width={45}
          height={45}
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

  if (status === "authenticated") {
    return (
      <button className="p-4" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </button>
    );
  }
}
