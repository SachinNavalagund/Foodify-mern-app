import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDataBase } from "./utils/connectDataBase.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello app is running successfully" });
});

const PORT = 3000;

app.listen(PORT, () => {
  connectDataBase();
  console.log(`Server is running on localhost:${PORT}`);
});
