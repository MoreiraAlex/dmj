"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllConquistas() {
  try {
    const conquistas = await prisma.conquista.findMany({
      orderBy: { pontosXp: "asc" },
    });

    return conquistas;
  } catch (error) {
    console.error("Erro ao buscar conquistas:", error);
    return [];
  }
}

export async function getConquistasUsuario(userId) {
  try {
    const conquistas = prisma.conquistaUsuario.findMany({
      where: { usuarioId: userId },
      select: { conquistaId: true },
    });

    return conquistas;
  } catch (error) {
    console.error("Erro ao buscar conquistas:", error);
    return [];
  }
}
