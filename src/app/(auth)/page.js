"use client";
import { HomeCard } from "@/components/cards/home";
import HomeHelp from "@/components/helpers/home";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  const jogos = [
    { href: "/select?game=verb", image: "/verb.png", title: "Verbo" },
    { href: "/coming", image: "/crossword.png", title: "Palavras Cruzadas" },
    {
      href: "/coming",
      image: theme === "light" ? "/wordhunt.png" : "/wordhuntDark.png",
      title: "Caça Palavras",
    },
    { href: "/coming", image: "/dmj.png", title: "Em breve" },
  ];

  return (
    <div className="text-center px-4 py-12 space-y-12">
      <HomeHelp />
      <h1 className="text-3xl font-bold text-primary">Nossos Jogos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {jogos.map((jogo) => (
          <HomeCard href={jogo.href} key={jogo.title} image={jogo.image} title={jogo.title} />
        ))}
      </div>
    </div>
  );
}
