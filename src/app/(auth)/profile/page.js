import { auth } from "@/lib/auth";
import { HistoryIcon, Trophy } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";
import { DeleteAccountButton, EditNameModal } from "@/components/modals/profile";
import { getUser, updateName } from "@/actions/profile-actions";

export default async function Profile() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  const userInfo = await getUser(user.id);

  return (
    <div className="flex flex-col items-center justify-evenly h-[75vh]">
      <div className="flex flex-col items-center gap-2">
        <Image className="rounded-full" src={user.image} alt="user image" width={80} height={80} />

        <div className="flex items-center gap-2">
          <EditNameModal currentName={user.name} onSave={updateName} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="italic">Nivel {userInfo.level || 0}</span>
          <span className="italic text-sm">{userInfo.xp || 0}/100</span>
        </div>
      </div>

      <div className="flex items-center justify-around w-full">
        <Link href="profile/conquest" className="flex flex-col items-center gap-2">
          <Trophy className="size-12 text-muted-foreground" />
          <span className="text-sm font-medium text-center">Conquistas</span>
        </Link>

        <Link href="#" className="flex flex-col items-center gap-2">
          <HistoryIcon className="size-12 text-muted-foreground" />
          <span className="text-sm font-medium text-center">Histórico</span>
        </Link>

        <DeleteAccountButton />
      </div>
    </div>
  );
}
