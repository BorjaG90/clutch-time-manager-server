import { Router } from "express";
import authMdw from "../middleware/auth";

import { getSports } from "../controllers/sport.controller";

const router = Router();

router.get("/", authMdw.ensureAuthenticated, getSports);

export default router;