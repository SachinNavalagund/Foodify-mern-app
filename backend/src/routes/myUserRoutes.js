import express from "express";
import {
  createCurrentUser,
  getCurrentLoggedInUser,
  updateCurrentUser,
} from "../controllers/myUserController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateMyUserRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/get-logged-user", jwtCheck, jwtParse, getCurrentLoggedInUser);
router.post("/create-user", jwtCheck, createCurrentUser);
router.put(
  "/update-user",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  updateCurrentUser
);

export default router;
