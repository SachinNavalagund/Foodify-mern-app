import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import { connectDataBase } from "./utils/connectDataBase.js";
import myUserRoute from "../src/routes/myUserRoutes.js";
import myRestaurantRoute from "../src/routes/myRestaurantRoute.js";
import restaurantRoute from "../src/routes/restaurantRoute.js";
import orderRoute from "../src/routes/orderRoute.js";

const app = express();
dotenv.config();

app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/health", async (req, res) => {
  res.send({ message: "Health ok 🎉" });
});

const PORT = 3000;

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  connectDataBase();
  console.log(`Server is running on localhost:${PORT}`);
});
