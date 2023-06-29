import { SignInButton } from "./components/buttons/buttons.comp";
import { SignOutButton } from "./components/buttons/buttons.comp";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex sticky top-0 items-center justify-between h-16 text-center bg-gray-400">
      <Link className="px-4 text-3xl" href="/landingPage">
        Dashboard App
      </Link>
      <div className="flex flex-row">
        <SignInButton />
        <SignOutButton />
      </div>
    </div>
  );
}
