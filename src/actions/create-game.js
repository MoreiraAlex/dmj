"use server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function Verbo({ title, privacy, password, word, tries, hint }) {
  try {
    const { user } = await auth.api.getSession({
      headers: await headers(),
    });

    if (!user) {
      return { error: "Usuário não autenticado" };
    }

    if (!title) return { error: "Título é obrigatório" };
    if (!word) return { error: "Palavra secreta é obrigatória" };
    if (!tries) return { error: "Número de tentativas é obrigatório" };
    if (privacy === "private" && !password)
      return { error: "Senha é obrigatória para jogos privados" };

    const jogo = await prisma.jogo.create({
      data: {
        capaUrl: "/verb.png",
        idCriador: user.id,
        nome: title,
        visibilidade: privacy,
        senha: privacy === "private" ? password : null,
      },
    });

    const config = await prisma.config.create({
      data: {
        jogoId: jogo.id,
        tipo: "verbo",
      },
    });

    await prisma.configJogoVerbo.create({
      data: {
        configId: config.id,
        palavraSecreta: word,
        maxTentativas: Number(tries),
        dica: hint || null,
      },
    });

    return { success: true, jogoId: jogo.id };
  } catch (err) {
    console.error("Erro ao criar jogo:", err);
    return { error: "Erro inesperado ao criar o jogo" };
  }
}
