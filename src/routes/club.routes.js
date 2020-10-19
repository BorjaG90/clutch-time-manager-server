import { Router } from "express";
import authMdw from "../middleware/auth";

import { updateClub } from "../controllers/user.controller";

const router = Router();

router.put("/:id", authMdw.ensureAuthenticated, updateClub);

export default router;
