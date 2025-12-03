"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getJogosCriados(userId) {
  return prisma.jogo.findMany({
    where: { idCriador: userId },
    include: { criador: true, historicos: { where: { usuarioId: userId } } },
    orderBy: { dataCriacao: "desc" },
  });
}

export async function getJogosJogados(userId) {
  return prisma.historico.findMany({
    where: { usuarioId: userId },
    include: {
      jogo: {
        include: {
          criador: true,
        },
      },
    },
    orderBy: { status: "desc" },
  });
}
