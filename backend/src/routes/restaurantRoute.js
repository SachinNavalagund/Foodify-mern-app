import express from "express";
import { param } from "express-validator";
import { searchRestaurants } from "../controllers/restaurantController.js";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter is valid string"),
  searchRestaurants
);

export default router;
