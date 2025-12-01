"use server";

import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateName(newName) {
  if (!newName || newName.trim().length < 2) return;

  const cookieStore = await cookies();
  const response = await auth.api.updateUser({
    body: {
      name: newName,
    },
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  return { success: true, response };
}

export async function getUser(userId) {
  try {
    const user = prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return [];
  }
}

export async function addConquistaToUser(userId, conquistaNome) {
  try {
    const conquista = await prisma.conquista.findUnique({
      where: { nome: conquistaNome },
    });

    if (!conquista) {
      throw new Error(`Conquista '${conquistaNome}' não encontrada.`);
    }

    const conquistaId = conquista.id;

    const existente = await prisma.conquistaUsuario.findFirst({
      where: { usuarioId: userId, conquistaId },
    });

    if (existente) {
      return {
        status: "jaPossui",
        conquista: existente,
      };
    }

    const novaConquista = await prisma.conquistaUsuario.create({
      data: {
        usuarioId: userId,
        conquistaId,
      },
      include: {
        conquista: true,
      },
    });

    const xp = conquista.pontosXp || 0;
    addXpToUser(userId, xp);

    return {
      status: "desbloqueada",
      conquista: novaConquista,
    };
  } catch (error) {
    console.error("Erro ao adicionar conquista ao usuário:", error);
    return {
      status: "erro",
      conquista: null,
    };
  }
}

export async function addXpToUser(userId, xpGain) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  let newXp = user.xp + xpGain;
  let newLevel = user.level;

  while (newXp >= 100) {
    newXp -= 100;
    newLevel += 1;
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      xp: newXp,
      level: newLevel,
    },
  });

  return updated;
}
