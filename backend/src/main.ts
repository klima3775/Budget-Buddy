import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import transactionsRoutes from "./routes/transactions.js";
// import userRoutes from "./routes/users.js";

dotenv.config();

const app: Application = express();

const Port: number = (process.env.PORT && parseInt(process.env.PORT)) || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
