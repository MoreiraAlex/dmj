import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const conquests = [
    {
      nome: "Primeira Vitória",
      descricao: "Complete seu primeiro jogo.",
      pontosXp: 50,
      icone: "Trophy",
    },
    {
      nome: "Explorador",
      descricao: "Acesse a página de conquistas pela primeira vez.",
      pontosXp: 10,
      icone: "Lamp",
    },
    {
      nome: "Focado",
      descricao: "Complete 5 jogos.",
      pontosXp: 100,
      icone: "Star",
    },
    {
      nome: "Persistente",
      descricao: "Complete 10 jogos.",
      pontosXp: 150,
      icone: "Award",
    },
    {
      nome: "Começando",
      descricao: "Crie seu primeiro jogo.",
      pontosXp: 25,
      icone: "Lamp",
    },
    {
      nome: "Designer",
      descricao: "Crie 3 jogos personalizados.",
      pontosXp: 80,
      icone: "Palette",
    },
    {
      nome: "Viciado?",
      descricao: "Jogue por mais de 1 hora ao total.",
      pontosXp: 120,
      icone: "Clock",
    },
    {
      nome: "Colecionador",
      descricao: "Desbloqueie 5 conquistas.",
      pontosXp: 100,
      icone: "Gift",
    },
    {
      nome: "Fã de Palavras",
      descricao: "Complete 1 jogo de caça-palavras.",
      pontosXp: 40,
      icone: "Type",
    },
    {
      nome: "Mestre das Cruzadas",
      descricao: "Complete 1 jogo de cruzadas.",
      pontosXp: 70,
      icone: "Puzzle",
    },
    {
      nome: "Aquecendo",
      descricao: "Jogue por 10 minutos.",
      pontosXp: 15,
      icone: "Flame",
    },
    {
      nome: "Velocista",
      descricao: "Complete um jogo em menos de 2 minutos.",
      pontosXp: 90,
      icone: "Zap",
    },
    {
      nome: "Maratonista",
      descricao: "Complete 20 jogos.",
      pontosXp: 200,
      icone: "Activity",
    },
    {
      nome: "Insano",
      descricao: "Complete 50 jogos.",
      pontosXp: 350,
      icone: "Crown",
    },
    {
      nome: "Criativo",
      descricao: "Crie 10 jogos personalizados.",
      pontosXp: 150,
      icone: "Brush",
    },
    {
      nome: "Curioso",
      descricao: "Visite todas as páginas do app.",
      pontosXp: 30,
      icone: "Compass",
    },
    {
      nome: "Compartilhou!",
      descricao: "Compartilhe um jogo com alguém.",
      pontosXp: 40,
      icone: "Share2",
    },
    {
      nome: "Amigo do Tempo",
      descricao: "Jogue em 5 dias diferentes.",
      pontosXp: 110,
      icone: "Calendar",
    },
    {
      nome: "Rotina",
      descricao: "Jogue em 10 dias seguidos.",
      pontosXp: 180,
      icone: "Repeat",
    },
    {
      nome: "Sorte Grande",
      descricao: "Complete um jogo sem erros.",
      pontosXp: 140,
      icone: "Sparkles",
    },
    {
      nome: "Mestre da Velocidade",
      descricao: "Complete 3 jogos seguidos abaixo de 3 minutos.",
      pontosXp: 200,
      icone: "Gauge",
    },
    {
      nome: "Metódico",
      descricao: "Complete 3 jogos de cada tipo.",
      pontosXp: 250,
      icone: "Layers",
    },
    {
      nome: "É o Mestre!",
      descricao: "Desbloqueie 20 conquistas.",
      pontosXp: 400,
      icone: "BadgeCheck",
    },
    {
      nome: "Começo da Jornada",
      descricao: "Ganhe seus primeiros 100 XP.",
      pontosXp: 20,
      icone: "TrendingUp",
    },
    {
      nome: "Lendário",
      descricao: "Alcance 2000 XP totais.",
      pontosXp: 500,
      icone: "Gem",
    },
  ];

  for (const conquest of conquests) {
    await prisma.conquista.upsert({
      where: { nome: conquest.nome },
      update: {},
      create: conquest,
    });
  }

  console.log("Conquistas inseridas com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
