import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Home, Plus, SunMoonIcon, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logout } from "@/components/botoes/auth";
import { ThemeButton } from "../botoes/theme";

export function AppSidebar({ userSession }) {
  const isAnonymous = userSession.user.isAnonymous;

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-6 flex flex-row items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          {isAnonymous ? (
            <UserCircle className="size-12 text-muted-foreground" />
          ) : (
            <Image
              className="rounded-full"
              src={userSession.user.image}
              alt="user image"
              width={56}
              height={56}
            />
          )}

          <span className="text-sm font-medium text-center">{userSession.user.name}</span>
        </div>

        <Logout />
      </SidebarHeader>

      <div className="w-[80%] mx-auto">
        <SidebarSeparator className="border" />
      </div>

      <SidebarContent>
        <SidebarMenu className="space-y-4 px-4 py-6">
          <SidebarMenuItem>
            <Link href="#" className="flex gap-3 items-center text-base">
              <Image src="/logo.png" alt="ico" width={56} height={56} className="rounded-md" />
              Palavras Cruzadas
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="#" className="flex gap-3 items-center text-base">
              <Image src="/logo.png" alt="ico" width={56} height={56} className="rounded-md" />
              Verbo
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="#" className="flex gap-3 items-center text-base">
              <Image src="/logo.png" alt="ico" width={56} height={56} className="rounded-md" />
              Caça-Palavras
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="#" className="flex gap-3 items-center text-base text-primary">
              <Plus className="size-6" />
              Saiba mais
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <div className="w-[80%] mx-auto">
        <SidebarSeparator className="border" />
      </div>

      <SidebarFooter className="py-4 flex flex-row items-center justify-around">
        <ThemeButton />
        <Link href="/">
          <Home className="size-7" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
