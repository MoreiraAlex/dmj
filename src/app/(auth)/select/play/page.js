"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { GameTabs } from "@/components/tabs/game";
import { useEffect, useState } from "react";
import { ListGame } from "@/actions/list-game";

export default function List() {
  const [games, setGames] = useState([]);
  const searchParams = useSearchParams();
  const game = searchParams.get("game");

  useEffect(() => {
    async function run() {
      const games = await ListGame("verbo");
      setGames(games);
    }
    run();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 text-center">
      <Image
        src={`/${game}.png`}
        alt={game}
        width={150}
        height={150}
        className="object-contain rounded-lg shadow-md"
      />

      <GameTabs
        game={game}
        publicos={games.filter((g) => g.visibilidade === "public")}
        privados={games.filter((g) => g.visibilidade === "private")}
      />
    </div>
  );
}
