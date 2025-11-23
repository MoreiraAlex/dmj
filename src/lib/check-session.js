"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function checkAnonymousSession() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  return user.isAnonymous;
}
