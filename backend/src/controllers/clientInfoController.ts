import { Request, Response } from "express";
import redis from "../config/redisClient.js";

const getClientInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      res.status(400).json({ message: "Відсутній ідентифікатор користувача" });
      return;
    }

    const redisKey = `clientInfo:${userId}`;
    const cachedData = await redis.get(redisKey);

    if (cachedData) {
      res.json(JSON.parse(cachedData));
      return;
    }

    res.status(404).json({
      message:
        "Дані клієнта не знайдено. Спробуйте оновити сторінку або увійти знову.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Помилка отримання даних клієнта",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default getClientInfo;
