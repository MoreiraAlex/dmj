import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { anonymous } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  advanced: {
    database: {
      // generateId: () => new ObjectId().toString(),
      generateId: false,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [anonymous(), nextCookies()],
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        // Se quiser fazer algo antes de excluir (limpeza, logs, checagem)
      },
    },
  },
  logger: {
    level: "debug",
  },
});
