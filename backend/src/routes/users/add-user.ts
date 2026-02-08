import type { Request, Response } from 'express';
import { addUserService } from '@/services/users/add-user-service.js';
import { AddUserRequestSchema } from '@/schemas/users.js';

// POST /users/
async function addUserHandler(req: Request, res: Response) {
  try {
    const body = AddUserRequestSchema.parse(req.body);

    const { username, email, leetcode_username } = body;

    if (!username || !email || !leetcode_username) {
      return res.status(400).json({ message: 'Invalid Request' });
    }

    if (
      typeof username !== 'string' ||
      typeof email !== 'string' ||
      typeof leetcode_username !== 'string'
    ) {
      return res.status(400).json({ message: 'Invalid Request' });
    }

    const user = await addUserService({
      username,
      email,
      leetcode_username,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { addUserHandler };
