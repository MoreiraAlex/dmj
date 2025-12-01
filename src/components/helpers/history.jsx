"use client";
import { useEffect } from "react";
import { useHelp } from "../context/help";

export default function HistoryHelp() {
  const { setContent } = useHelp();

  const Help = () => {
    return (
      <div className="w-full max-w-md mx-auto space-y-8 font-semibold text-center">
        <p className="font-bold">O histórico guarda os últimos jogos que você criou e jogou </p>
        <p className="font-bold">
          Você poderá checar o tipo de jogo, privacidade e nome do jogo, o nome do criador e data de
          criação ou em que jogou, além do status em que encerrou a sessão
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

        <p className="font-bold">Siga as instruções e divirta-se!</p>
      </div>
    );
  };

  useEffect(() => {
    setContent(<Help />);
  }, []);

  return null;
}
