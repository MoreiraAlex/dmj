"use client";
import { useEffect } from "react";
import { useHelp } from "../context/help";
import Image from "next/image";
import { Button } from "../ui/button";
import { Gamepad, Wrench } from "lucide-react";

export default function HomeHelp() {
  const { setContent } = useHelp();

  const Help = () => {
    return (
      <div className="space-y-4 text-center font-bold flex flex-col justify-center items-center">
        <h2>Selecione um jogo</h2>
        <Image src="/verb.png" alt="imagem" width={100} height={100} className="object-cover" />

        <div>Escolha se deseja criar ou jogar um jogo já criado</div>
        <div className="flex flex-row gap-6 flex-wrap justify-center mt-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center gap-2 p-4 w-20 h-20 rounded-xl"
            disabled={true}
          >
            <Wrench className="size-8 text-primary" />
            <span className="text-lg font-bold">Jogar</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center gap-2 p-4 w-20 h-20 rounded-xl"
            disabled={true}
          >
            <Gamepad className="size-8 text-primary" />
            <span className="text-lg font-bold">Criar</span>
          </Button>
        </div>
        <p className="font-bold">Siga as instruções e divirta-se!</p>
      </div>
    );
  };

  useEffect(() => {
    setContent(<Help />);
  }, []);

  return null;
}
