import { SignInButton } from "./components/buttons/buttons.comp";
import { SignOutButton } from "./components/buttons/buttons.comp";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex navbar-container bg-blue-300 h-24 justify-between items-center text-center">
      <Link className="text-3xl px-4" href="/landingPage">
        Dashboard App
      </Link>
      <SignInButton />
      <SignOutButton />
    </div>
  );
}
