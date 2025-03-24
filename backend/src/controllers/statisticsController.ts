import { Request, Response } from "express";
import fetchStatement from "../services/fetchStatment.js";
import redis from "../config/redisClient.js";

interface Transaction {
  time: number;
  amount: number;
}

export const getMonthlyStatistics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const account = req.query.account as string;

    if (!userId || !account) {
      res.status(400).json({ message: "Невірні параметри запиту" });
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - 2682000;

    const redisKey = `statistics:${userId}:${account}`;
    const cachedData = await redis.get(redisKey);

    if (cachedData) {
      res.json(JSON.parse(cachedData));
      return;
    }

    const transactions: Transaction[] = await fetchStatement(
      userId,
      account,
      oneMonthAgo,
      now
    );

    // Группируем транзакции по дням
    const stats: Record<string, number> = {};

    transactions.forEach((tx: Transaction) => {
      const date = new Date(tx.time * 1000).toISOString().split("T")[0];
      stats[date] = (stats[date] || 0) + tx.amount / 100;
    });

    const statistics = Object.entries(stats).map(([date, amount]) => ({
      date,
      amount,
    }));

    // Кэшируем в Redis на 5 минут
    await redis.setex(redisKey, 300, JSON.stringify(statistics));

    res.json(statistics);
  } catch (error) {
    console.error("Помилка отримання статистики:", error);
    res.status(500).json({
      message: "Помилка сервера",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
