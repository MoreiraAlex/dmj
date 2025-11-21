import { getAllConquistas, getConquistasUsuario } from "@/actions/conquest";
import { auth } from "@/lib/auth";
import { Trophy } from "lucide-react";
import { headers } from "next/headers";
import { ConquistaItem } from "@/components/modals/conquest";

export default async function Conquest() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  const conquistas = await getAllConquistas();
  const conquistasUsuario = await getConquistasUsuario(user.id);

  const idsUsuario = new Set(conquistasUsuario.map((c) => c.conquistaId));

  const total = conquistas.length;
  const doUsuario = idsUsuario.size;

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center">
        <Trophy className="size-20 text-muted-foreground" />
        <span className="text-md font-medium text-center">Conquistas</span>
        <span className="text-sm font-medium text-center">
          {doUsuario}/{total}
        </span>
      </div>

      <div className="flex gap-3 border-2 m-2 p-4 rounded-md flex-wrap justify-center content-start">
        {conquistas.map((item) => {
          const obtida = idsUsuario.has(item.id);

          return <ConquistaItem key={item.id} conquista={item} obtida={obtida} />;
        })}
      </div>
    </div>
  );
}
