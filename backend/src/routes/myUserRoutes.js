import express from "express";
import { createCurrentUser } from "../controllers/myUserController.js";

const router = express.Router();

router.post("/create-user", createCurrentUser);

export default router;
