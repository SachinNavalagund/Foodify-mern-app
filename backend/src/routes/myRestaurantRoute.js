import express from "express";
import multer from "multer";
import { createMyRestaurant } from "../controllers/myRestaurantController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateMyRestaurantRequest } from "../middleware/validation.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/create-restaurent",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  createMyRestaurant
);

export default router;
