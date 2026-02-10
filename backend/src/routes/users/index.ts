import { Router } from 'express';
import { getUserByIdHandler } from './get-user-by-id.js';

const router = Router();

// Example route
router.get('/:id', getUserByIdHandler);

export default router;
