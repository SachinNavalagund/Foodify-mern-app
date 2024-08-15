import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDataBase } from "./utils/connectDataBase.js";
import myUserRoute from "../src/routes/myUserRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/health", async (req, res) => {
  res.send({ message: "Health ok 🎉" });
});

const PORT = 3000;

app.use("/api/my/user", myUserRoute);

app.listen(PORT, () => {
  connectDataBase();
  console.log(`Server is running on localhost:${PORT}`);
});
