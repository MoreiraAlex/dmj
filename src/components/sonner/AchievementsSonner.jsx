"use client";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { addConquistaToUser } from "@/actions/profile";
import { authClient } from "@/lib/auth-client";

export function AchievementsSonner({ nome, check }) {
  const { data, isPending } = authClient.useSession();
  const [executou, setExecutou] = useState(false);
  const [conquista, setConquista] = useState(null);

  useEffect(() => {
    if (!check || isPending || !data?.user || executou) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExecutou(true);

    async function addConquista() {
      const result = await addConquistaToUser(data.user.id, nome);

      if (result?.status === "desbloqueada") {
        setConquista(result.conquista);
      }
    }

    addConquista();
  }, [check, isPending, data?.user, nome, executou]);

  useEffect(() => {
    if (!conquista) return;

    const Icon = Icons[conquista.conquista.icone] ?? Icons.Trophy;

    toast.custom(() => (
      <Card className="shadow-xl border-2 border-primary bg-background/95 backdrop-blur-xl w-[340px]">
        <CardContent className="flex items-center gap-4 py-4">
          <div className="p-3 rounded-full bg-primary text-white shadow">
            <Icon size={26} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {conquista.conquista.nome}
              <Badge className="bg-primary text-white">+{conquista.conquista.pontosXp} XP</Badge>
            </h2>

            <p className="text-sm text-muted-foreground">{conquista.conquista.descricao}</p>
          </div>
        </CardContent>
      </Card>
    ));
  }, [conquista]);

  return null;
}
