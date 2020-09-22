import { Router } from 'express'
import { createUser } from '../controllers/user.controller'

const router = Router();

// /api/projects/
router.post('/', createUser);

export default router;