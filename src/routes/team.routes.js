import { Router } from 'express'
import { createTeam, deleteTeam, getOneTeam, getTeams, updateTeam } from '../controllers/team.controller';

const router = Router();

// /api/teams/
router.post('/', createTeam);
router.get('/', getTeams);

// api/teams/:teamID
router.get('/:id', getOneTeam);
router.delete('/:id', deleteTeam);
router.put('/:id', updateTeam);

export default router;