"use client";
import { useEffect } from "react";
import { useHelp } from "../context/help";

export default function CreateVerbHelp() {
  const { setContent } = useHelp();

  const Help = () => {
    return (
      <div className="w-full max-w-md mx-auto space-y-8 font-semibold text-center">
        <div className="space-y-4">
          <p className="font-bold">Escolha a palavra secreta</p>
          <div className="flex gap-2 justify-center items-center">
            {"JOGO".split("").map((letra, index) => (
              <div
                key={index}
                className="max-w-8 h-8 text-xl rounded border flex justify-center items-center p-2"
              >
                {letra}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-bold">
            Decida quantas tentativas os jogadores terão para acertarem a palavra
          </p>
          <div className="space-y-2 w-full">
            {[...Array(3)].map((_, linha) => (
              <div key={linha} className="flex justify-center items-center gap-2">
                {[...Array(4)].map((_, col) => {
                  return (
                    <div
                      key={col}
                      className={`w-8 h-8 xt-xl rounded border flex justify-center items-center p-2`}
                    >
                      {" "}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-bold">
            Caso queira, pode adicionar uma dica. Ela será mostrada ao jogador caso ele esteja em
            sua última tentativa
          </p>

          <div className="w-full border-b-2 text-center">
            <span className="text-sm opacity-70 italic">Dica: Diversão</span>
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
