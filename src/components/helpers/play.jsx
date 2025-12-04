"use client";
import { useEffect } from "react";
import { useHelp } from "../context/help";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";
import Image from "next/image";
import { Search } from "lucide-react";

export default function PlayHelp() {
  const { setContent } = useHelp();

  const Help = () => {
    return (
      <div className="w-full max-w-md mx-auto space-y-8 font-semibold text-center">
        <div className="space-y-4">
          <p className="font-bold">Neste lobby você escolhe qual jogo criado você jogará</p>
          <Item className="flex items-center justify-between gap-4 px-2">
            <ItemMedia>
              <Image
                src="/verb.png"
                width={100}
                height={100}
                alt="verb"
                className="w-12 h-12 rounded-md "
              />
            </ItemMedia>

            <ItemContent className="flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <ItemTitle className="font-semibold">DoSeuJeito2</ItemTitle>
              </div>

              <div className="flex flex-col text-xs text-muted-foreground gap-2">
                <span className="bg-[#39a293] text-white rounded-2xl p-2 text-center font-bold">
                  01/02/2024
                </span>
                <span>De: XS_Vinicius</span>
              </div>
            </ItemContent>
          </Item>
        </div>

        <div className="space-y-4">
          <p className="font-bold">
            Escolha entre jogos públicos e privados (estes necessitam de senha para serem acessados)
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="rounded-2xl p-2 text-center font-bold">Público</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <span className="bg-primary rounded-2xl p-2 text-center font-bold">Privado</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 flex flex-col items-center justify-center">
          <p className="font-bold">Caso esteja procurando um jogo específico, utilize a busca</p>
          <Search className="size-10" />
        </div>

        <div className="space-y-4">
          <p className="font-bold">
            Jogos que você jogou porém não terminou terão um indicador amarelo, os que terminou
            terão um verde
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="bg-primary px-10 py-4 rounded-2xl"></span>
              <span>Em progresso</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <span className="bg-[#39a293] px-10 py-4 rounded-2xl"></span>
              <span>Finalizado</span>
            </div>
          </div>
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
