import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import GoogleCalendar from "../dash.comp/googleCalendar/dc.googleCalendar";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="container justify-center items-center">
      <h1 className="text-5xl text-center py-4">
        Welcome to your dashboard, {session?.user?.name}!
      </h1>
      <GoogleCalendar />
    </div>
  );
}
