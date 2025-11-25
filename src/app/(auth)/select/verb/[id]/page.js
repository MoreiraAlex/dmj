"use client";
import { GameId } from "@/actions/play-game";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TermoGame from "@/components/games/TermoGame";

export default function SelectGame() {
  const router = useRouter();
  const { id } = useParams();
  const [game, setGame] = useState({});

  useEffect(() => {
    async function run() {
      const gameId = await GameId(id, "verbo");
      setGame(gameId);
    }
    run();
  }, []);

  if (!game || game.error || Object.keys(game).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-semibold">Jogo não encontrado!</p>
        <Button onClick={() => router.push("/")}>Voltar para Home</Button>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-center">#{game.nome}</h1>

      <TermoGame
        jogoId={game.id}
        palavra={game.config.verbo.palavraSecreta}
        maxTentativas={game.config.verbo.maxTentativas}
        dica={game.config.verbo.dica}
      />
    </div>
  );
}
