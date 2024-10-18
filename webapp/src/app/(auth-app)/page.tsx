import TodoDashboardContent from "@/modules/todo/display/components/todo-dashboard-content";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (
    !session ||
    (session.expires && new Date(session.expires) <= new Date())
  ) {
    redirect("/login");
  }

  return <TodoDashboardContent />;
}
