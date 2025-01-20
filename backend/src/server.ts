import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();
connectDB();
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api/auth", authRouter);

// Добавьте этот маршрут
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
