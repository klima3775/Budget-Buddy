import { Request, Response } from "express";
import redis from "../config/redisClient.js";
import fetchStatement from "../services/fetchStatment.js";

const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { account } = req.params;

    if (!userId || !account) {
      res.status(400).json({ message: "Невірні параметри запиту" });
      return;
    }

    const now = Math.floor(Date.now() / 1000); // Unix timestamp
    const oneMonthAgo = now - 2682000; // 31 день + 1 час

    const redisKey = `transactions:${userId}:${account}`;
    const cachedData = await redis.get(redisKey);

    if (cachedData) {
      res.json(JSON.parse(cachedData));
      return;
    }

    const transactions = await fetchStatement(
      userId,
      account,
      oneMonthAgo,
      now
    );

    // Кэшируем в Redis на 5 минут
    await redis.setex(redisKey, 300, JSON.stringify(transactions));

    res.json(transactions);
  } catch (error) {
    console.error("Помилка отримання транзакцій:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export default getTransactions;
