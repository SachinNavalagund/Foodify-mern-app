import express from "express";
import { param } from "express-validator";
import {
  getRestaurantById,
  searchRestaurants,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be valid string"),
  searchRestaurants
);

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id parameter must be valid string"),
  getRestaurantById
);

export default router;
