import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (userSession) {
    redirect("/");
  }

  return <>{children}</>;
}
