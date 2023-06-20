import { getServerSession } from "next-auth";

import LandingPage from "./landingPage/page";

export default function Home() {
  const { data: session } = getServerSession();

  if (!session) {
    return (
      <>
        <LandingPage />
      </>
    );
  }
}
