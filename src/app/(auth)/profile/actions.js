"use server";

import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

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
