import { HomeCard } from "@/components/cards/home";

export default function Home() {
  const jogos = [
    { href: "/select?game=crossword", image: "/crossword.png", title: "Palavras Cruzadas" },
    { href: "/select?game=verb", image: "/verb.png", title: "Verbo" },
    { href: "/select?game=wordhunt", image: "/wordhunt.png", title: "Caça Palavras" },
    { href: "#", image: "/dmj.png", title: "Em breve" },
  ];

  return (
    <div className="text-center px-4 py-12 space-y-12">
      <h1 className="text-3xl font-bold text-primary">Nossos Jogos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {jogos.map((jogo) => (
          <HomeCard href={jogo.href} key={jogo.title} image={jogo.image} title={jogo.title} />
        ))}
      </div>
    </div>
  );
}
