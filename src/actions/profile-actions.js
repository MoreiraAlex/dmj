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
