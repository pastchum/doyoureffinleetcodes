import z from 'zod';
import { prisma } from '@/lib/prisma.js';
import { UserSchema } from '@/schemas/users.js';

async function addUserService(userData: {
  username: string;
  email: string;
  leetcode_username?: string;
}) {
  const newUser = await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      leetcode_username: userData.leetcode_username,
      current_streak: 0,
      longest_streak: 0,
    },
  });

  const parsedUser = UserSchema.parse(newUser);
  return parsedUser;
}

export { addUserService };
