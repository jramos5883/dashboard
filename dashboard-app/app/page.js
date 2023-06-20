import { getServerSession } from "next-auth";

import LandingPage from "./landingPage/page";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return <LandingPage />;
  }
}
