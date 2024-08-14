import express from "express";
import { createCurrentUser } from "../controllers/myUserController.js";
import { jwtCheck } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-user", jwtCheck, createCurrentUser);

export default router;
