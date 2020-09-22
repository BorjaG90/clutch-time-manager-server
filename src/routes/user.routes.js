import { Router } from "express";
import { getTeamByUser } from "../controllers/team.controller";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

// /api/users/
router.post("/", createUser);
router.get("/", getUsers);

// api/users/:userID
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/:id/teams", getTeamByUser);

export default router;
