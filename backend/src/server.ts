import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRouter from "./routes/authRoutes.js";
import monoRoutes from "./routes/monoRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", authRouter);
app.use("/api/mono", monoRoutes);
app.use("/api/mono", monoRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

connectDB();
const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
