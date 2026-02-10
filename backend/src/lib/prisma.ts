import { PrismaClient } from '@/generated/@prisma/client/client.js';
import type { PrismaClientOptions } from '@prisma/client/runtime/client';

const prisma = new PrismaClient();

export { prisma };