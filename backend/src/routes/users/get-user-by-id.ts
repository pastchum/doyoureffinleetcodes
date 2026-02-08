import type { Request, Response } from 'express';
import { getUserByIdService } from '@/services/users/get-user-by-id-service.js';

// GET /users/:id
async function getUserByIdHandler(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'Invalid Request' });
        }
        if (typeof userId !== 'string') {
            return res.status(400).json({ message: 'Invalid Request' });
        }

        const user = await getUserByIdService(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { getUserByIdHandler };