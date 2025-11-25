"use server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "bson";

const prisma = new PrismaClient();

export async function GameId(id, game) {
  try {
    const { user } = await auth.api.getSession({
      headers: await headers(),
    });

    if (!user) {
      return { error: "Usuário não autenticado" };
    }

    if (!ObjectId.isValid(id)) {
      return { error: "ID inválido" };
    }

    const jogo = await prisma.jogo.findUnique({
      include: {
        config: {
          include: {
            [game]: true,
          },
        },
      },
      where: { id },
    });

    return jogo;
  } catch (err) {
    console.error("Erro ao buscar jogo:", err);
    return { error: "Erro inesperado ao buscar o jogo" };
  }
}

export async function getHistorico(jogoId) {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) return null;

  return prisma.historico.findFirst({
    where: { usuarioId: user.id, jogoId },
    include: {
      progresso: {
        include: {
          verbo: true,
        },
      },
    },
  });
}

export async function salvarProgressoVerbo(jogoId, tentativa, acertou, maxTentativas) {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) return null;

  let historico = await prisma.historico.findFirst({
    where: { usuarioId: user.id, jogoId },
    include: {
      progresso: {
        include: {
          verbo: true,
        },
      },
    },
  });

  if (!historico) {
    historico = await prisma.historico.create({
      data: {
        usuarioId: user.id,
        jogoId,
        status: "playing",
        progresso: {
          create: {
            tipo: "verbo",
            verbo: {
              create: {
                tentativas: 0,
                palavras: [],
                resultados: [],
                acertou: false,
              },
            },
          },
        },
      },
      include: {
        progresso: {
          include: { verbo: true },
        },
      },
    });
  }

  const verbo = historico.progresso?.verbo;
  const novasTentativas = (verbo?.tentativas ?? 0) + 1;
  const novasPalavras = [...(verbo?.palavras ?? []), tentativa];

  await prisma.progressoVerbo.update({
    where: { id: verbo.id },
    data: {
      tentativas: novasTentativas,
      palavras: novasPalavras,
      acertou,
    },
  });

  await prisma.historico.update({
    where: { id: historico.id },
    data: {
      status: acertou ? "completed" : novasTentativas >= maxTentativas ? "failed" : "playing",
    },
  });
}
