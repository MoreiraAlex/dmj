"use client";
import { useEffect } from "react";
import { useHelp } from "../context/help";
import { HistoryIcon, Pen, Trash, Trophy, UserCircle } from "lucide-react";

export default function ProfileHelp() {
  const { setContent } = useHelp();

  const Help = () => {
    return (
      <div className="w-full max-w-md mx-auto space-y-8 font-semibold text-center">
        <p className="font-bold">
          Este é o seu perfil. Personalize-o e acompanhe seu progresso por aqui.
        </p>

        <div className="grid grid-cols-[60px_1fr] items-center gap-y-6 gap-x-4 text-left">
          <UserCircle className="size-12 text-muted-foreground mx-auto" />
          <div>
            Foto de Perfil <br />
            <span className="text-sm font-normal text-muted-foreground">
              sincronizada com sua conta Google
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Pen className="size-5 text-muted-foreground" />
          </div>
          <div>
            Nome do usuário <br />
            <span className="text-sm font-medium text-muted-foreground">Clique para editar</span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="italic">Nivel 5</span>
            <span className="italic text-sm">50/100</span>
          </div>
          <div>
            Nível e Experiência <br />
            <span className="text-sm font-normal text-muted-foreground">Aumente-os jogando</span>
          </div>

          <Trophy className="size-12 text-muted-foreground mx-auto" />
          <div>
            Conquistas <br />
            <span className="text-sm font-normal text-muted-foreground">
              Visualize seu progresso
            </span>
          </div>

          <HistoryIcon className="size-12 text-muted-foreground mx-auto" />
          <div>
            Histórico de jogos <br />
            <span className="text-sm font-normal text-muted-foreground">
              Acompanhe suas atividades
            </span>
          </div>

          <Trash className="size-12 text-destructive mx-auto" />
          <div>
            Apagar Conta <br />
            <span className="text-sm font-normal text-destructive">
              Excluir permanentemente sua conta
            </span>
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
