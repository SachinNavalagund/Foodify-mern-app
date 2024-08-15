import express from "express";
import multer from "multer";
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
} from "../controllers/myRestaurantController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get("/get-my-restaurent", jwtCheck, jwtParse, getMyRestaurant);

router.post(
  "/create-restaurent",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  createMyRestaurant
);

router.put(
  "/update-restaurent",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  updateMyRestaurant
);

export default router;
