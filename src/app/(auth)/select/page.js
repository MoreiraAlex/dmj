"use client";
import { Button } from "@/components/ui/button";
import { Gamepad, Wrench } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function SelectGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const game = searchParams.get("game");

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg text-red-500">Jogo não encontrado.</p>
        <Button onClick={() => router.push("/")}>Voltar para Home</Button>
      </div>
    );
  }

  const handlePlay = () => router.push(`/select/${game}/play`);
  const handleCreate = () => router.push(`/select/${game}/create`);

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 text-center">
      <Image
        src={`/${game}.png`}
        alt={game}
        width={150}
        height={150}
        className="object-contain rounded-lg shadow-md"
      />

      <h1 className="text-3xl font-bold">Eae, o que vamos fazer?</h1>

      <div className="flex gap-6 flex-wrap justify-center mt-4">
        <Button
          onClick={handlePlay}
          variant="outline"
          className="flex flex-col items-center justify-center gap-2 p-4 w-32 h-32 rounded-xl"
        >
          <Wrench className="size-16 text-primary" />
          <span className="text-lg font-bold">Jogar</span>
        </Button>

        <Button
          onClick={handleCreate}
          variant="outline"
          className="flex flex-col items-center justify-center gap-2 p-4 w-32 h-32 rounded-xl"
        >
          <Gamepad className="size-16 text-primary" />
          <span className="text-lg font-bold">Criar</span>
        </Button>
      </div>
    </div>
  );
}
