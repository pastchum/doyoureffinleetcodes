import z from 'zod';
import { prisma } from '@/lib/prisma.js';
import { UserSchema } from '@/schemas/users.js';

async function getUserByIdService(requestedUserId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: requestedUserId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const parsedUser = UserSchema.parse(user);
  return parsedUser;
}

export { getUserByIdService };
