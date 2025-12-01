"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ListItem } from "../lists/list-games";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GameTabs({ game, publicos, privados }) {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");

  const filteredPublic = publicos.filter((j) => j.nome.toLowerCase().includes(query.toLowerCase()));
  const filteredPrivate = privados.filter((j) =>
    j.nome.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <Dialog open={openSearch} onOpenChange={setOpenSearch}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Pesquisar Jogos</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Digite o nome do jogo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          <Button className="mt-3 w-full" onClick={() => setOpenSearch(false)}>
            Fechar
          </Button>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="public" className="w-full p-2">
        <TabsList className="grid grid-cols-3 w-full bg-transparent">
          <TabsTrigger
            className="
              data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary 
              dark:data-[state=active]:text-primary-foreground font-bold rounded-2xl p-2"
            value="public"
          >
            Públicos
          </TabsTrigger>

          <button
            type="button"
            onClick={() => setOpenSearch(true)}
            className="flex items-center justify-center rounded-2xl p-2 hover:bg-muted transition"
          >
            <Search />
          </button>

          <TabsTrigger
            className="
              data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary 
              dark:data-[state=active]:text-primary-foreground font-bold rounded-2xl p-2"
            value="private"
          >
            Privados
          </TabsTrigger>
        </TabsList>

        <div className="w-[80%] mx-auto my-4">
          <Separator className="border" />
        </div>

        <TabsContent value="public">
          <div className="space-y-3 mt-4">
            {filteredPublic.length === 0 && (
              <p className="text-center text-muted-foreground text-sm">Nenhum jogo encontrado</p>
            )}

            {filteredPublic.map((jogo) => (
              <ListItem
                key={jogo.id}
                image={jogo.capaUrl ?? "/logo.png"}
                nome={jogo.nome}
                date={jogo.dataCriacao}
                user={jogo.criador.name}
                game={game}
                id={jogo.id}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="private">
          <div className="space-y-3 mt-4">
            {filteredPrivate.length === 0 && (
              <p className="text-center text-muted-foreground text-sm">Nenhum jogo encontrado</p>
            )}

            {filteredPrivate.map((jogo) => (
              <ListItem
                key={jogo.id}
                image={jogo.capaUrl ?? "/logo.png"}
                nome={jogo.nome}
                date={jogo.dataCriacao}
                user={jogo.criador.name}
                game={game}
                id={jogo.id}
                isPrivate={true}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
