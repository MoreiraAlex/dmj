"use client";
import { useEffect } from "react";
import { useHelp } from "../context/help";
import { Lightbulb } from "lucide-react";

export default function PlayVerbHelp() {
  const { setContent } = useHelp();

  const Help = () => {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 font-semibold text-center">
        <div className="space-y-4 flex flex-col justify-center items-center">
          <p className="font-bold">Cinza: Letra não está na palavra</p>
          <div className="w-12 h-12 text-xl rounded-xl bg-[#312a2c] text-white flex justify-center items-center p-2">
            D
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-center items-center">
          <p className="font-bold">Amarelo: Letra está presente, porém não nesta posição</p>
          <div className="w-12 h-12 text-xl rounded-xl bg-[#d3ad69] text-white flex justify-center items-center p-2">
            M
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-center items-center">
          <p className="font-bold">Verde: Letra correta e posição correta</p>
          <div className="w-12 h-12 text-xl rounded-xl bg-[#39a293] text-white flex justify-center items-center p-2">
            J
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-center items-center">
          <p className="font-bold">
            Caso chegue na última tentativa você terá a opção de visualizar uma dica deixada pelo
            criador (caso ele tenha adicionado uma)
          </p>
          <Lightbulb className="size-10" />
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
