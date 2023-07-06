import { SignInButton } from "./components/buttons/buttons.comp";
import { SignOutButton } from "./components/buttons/buttons.comp";
import Link from "next/link";
import { GiFlamingTrident } from "react-icons/gi";

export default function Navbar() {
  return (
    <div className="flex sticky top-0 items-center justify-between h-16 text-center bg-gray-400">
      <Link
        className="px-4 text-3xl flex flex-row items-center"
        href="/landingPage"
      >
        <span className="text-5xl">
          <GiFlamingTrident />
        </span>
        <span className="px-2 font-medium">Poseidon&apos;s Dashboard</span>
      </Link>
      <div className="flex flex-row">
        <SignInButton />
        <SignOutButton />
      </div>
    </div>
  );
}
