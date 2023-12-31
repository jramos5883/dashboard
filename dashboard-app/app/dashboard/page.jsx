import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import GoogleCalendarForm from "../dash.comp/googleCalendar/dc.googleCalendarForm";
import GoogleCalendar from "../dash.comp/googleCalendar/dc.googleCalendar";
import ShoppingList from "../dash.comp/shoppingList/dc.shoppingList";
import Tmgfhst from "../dash.comp/tmgfhst/dc.tmgfhst";
import TodoList from "../dash.comp/toDoListApp/dc.toDoList";
import Budget from "../dash.comp/budgetApp/dc.budgetApp";
import DotaProMatchTracker from "../dash.comp/dotaProMatchTracker/dc.dotaProMatchTracker";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="py-4 text-3xl text-center">
        Welcome to your dashboard, {session?.user?.name}!
      </h1>
      <GoogleCalendarForm />
      <GoogleCalendar />
      <TodoList />
      <Budget />
      <ShoppingList />
      <Tmgfhst />
      <DotaProMatchTracker />
    </div>
  );
}
