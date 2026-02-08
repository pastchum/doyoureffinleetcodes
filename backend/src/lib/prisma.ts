import type { PrismaClient as PrismaClientType } from '@prisma/client/scripts/default-index.js';
import { PrismaClient } from '@/generated/prisma/client.js';

type PrismaGlobal = typeof globalThis & {
  prisma?: PrismaClientType;
};

const globalForPrisma = globalThis as PrismaGlobal;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
