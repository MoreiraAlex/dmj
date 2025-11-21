import { AppSidebar } from "@/components/sidebar/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { HelpCircle } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!userSession) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar userSession={userSession} />
      <div className="flex flex-col w-full">
        <header className="flex justify-evenly items-center w-full mb-10 p-2 border-b h-20">
          <SidebarTrigger />
          <Image
            // className="dark:invert"
            src="/logo.png"
            alt="DoMeuJeito logo"
            width={150}
            height={100}
            priority
          />
          <HelpCircle className="size-10" />
        </header>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
