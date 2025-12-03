"use server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function ListGame({ type }) {
  try {
    const { user } = await auth.api.getSession({
      headers: await headers(),
    });

    if (!user) {
      return { error: "Usuário não autenticado" };
    }
    const games = await prisma.jogo.findMany({
      include: { config: true, criador: true, historicos: { where: { usuarioId: user.id } } },
      where: { ativo: true, config: { tipo: type } },
    });

    return games;
  } catch (err) {
    console.error("Erro ao listar os jogos:", err);
    return { error: "Erro inesperado ao listar os jogos" };
  }
}
