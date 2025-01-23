import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// Подключаем JSON-парсер
app.use(express.json());

// Настраиваем CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Подключаем маршруты
app.use("/api/auth", authRouter);

// Тестовый маршрут
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Подключаем базу данных и запускаем сервер
connectDB();
const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
