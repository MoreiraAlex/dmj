import { getJogosCriados, getJogosJogados } from "@/actions/history";
import { HistoryTabs } from "@/components/tabs/history";
import { auth } from "@/lib/auth";
import { HistoryIcon } from "lucide-react";
import { headers } from "next/headers";

export default async function History() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  const jogosCriados = await getJogosCriados(user.id);
  const jogosJogados = await getJogosJogados(user.id);

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-2">
        <HistoryIcon className="size-20 text-muted-foreground" />
        <span className="text-md font-medium text-center">Histórico</span>
      </div>

      <HistoryTabs criados={jogosCriados} jogados={jogosJogados} />
    </div>
  );
}
