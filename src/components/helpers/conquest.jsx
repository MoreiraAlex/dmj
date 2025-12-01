"use client";
import { useEffect } from "react";
import { useHelp } from "../context/help";
import { Trophy } from "lucide-react";

export default function ConquestHelp() {
  const { setContent } = useHelp();

  const Help = () => {
    return (
      <div className="w-full max-w-md mx-auto space-y-8 font-semibold text-center">
        <p className="font-bold">
          Adquira conquistas realizando certas ações, como vencendo sua primeira partida
        </p>

        <div className="flex items-center justify-center gap-4">
          <span
            className={`cursor-pointer rounded-[50%] size-16 flex items-center justify-center border-2 transition border-primary opacity-30 grayscale`}
          >
            <Trophy size={32} className="text-primary" />
          </span>

          <span
            className={`cursor-pointer rounded-[50%] size-16 flex items-center justify-center border-2 transition border-primary bg-primary`}
          >
            <Trophy size={32} className="text-primary-foreground" />
          </span>
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
