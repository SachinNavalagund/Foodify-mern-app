import express from "express";
import {
  createCurrentUser,
  updateCurrentUser,
} from "../controllers/myUserController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateMyUserRequest } from "../middleware/validation.js";

const router = express.Router();

router.post("/create-user", jwtCheck, createCurrentUser);
router.put(
  "/update-user",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  updateCurrentUser
);

export default router;
