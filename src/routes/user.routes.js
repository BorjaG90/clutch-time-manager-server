import { Router } from "express";
import authMdw from "../middleware/auth";

import { getTeamByUser } from "../controllers/team.controller";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  login,
  register,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

// /api/users/
router.post("/", createUser);
router.get("/", authMdw.ensureAuthenticated, getUsers);
router.post("/login", login);
router.post("/register", register);


// api/users/:userID
router.get("/:id", authMdw.ensureAuthenticated, getOneUser);
router.delete("/:id", authMdw.ensureAuthenticated, deleteUser);
router.put("/:id", authMdw.ensureAuthenticated, updateUser);
router.get("/:id/teams", authMdw.ensureAuthenticated, getTeamByUser);

export default router;
