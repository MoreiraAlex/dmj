"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { ListItem } from "../lists/list-games";

export function HistoryTabs({ criados, jogados }) {
  return (
    <Tabs defaultValue="criados" className="w-full p-2">
      <TabsList className="grid grid-cols-2 w-full bg-transparent">
        <TabsTrigger
          className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground font-bold rounded-2xl p-2"
          value="criados"
        >
          Criados
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground font-bold rounded-2xl p-2"
          value="jogados"
        >
          Jogados
        </TabsTrigger>
      </TabsList>

      <div className="w-[80%] mx-auto my-4">
        <Separator className="border" />
      </div>

      <TabsContent value="criados">
        <div className="space-y-3 mt-4">
          {criados.length === 0 && (
            <p className="text-center text-muted-foreground text-sm">Nenhum jogo criado</p>
          )}

          {criados.map((jogo) => (
            <ListItem
              key={jogo.id}
              image={jogo.capaUrl ?? "/logo.png"}
              nome={jogo.nome}
              date={jogo.dataCriacao}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="jogados">
        <div className="space-y-3 mt-4">
          {jogados.length === 0 && (
            <p className="text-center text-muted-foreground text-sm">Nenhum jogo jogado</p>
          )}

          {jogados.map((jogo) => (
            <ListItem
              key={jogo.id}
              image={jogo.jogo.capaUrl ?? "/logo.png"}
              nome={jogo.jogo.nome}
              date={jogo.jogo.dataCriacao}
              user={jogo.jogo.criador.name}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
