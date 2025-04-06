import { Request, Response } from "express";
import { getTransactionsForUser } from "../services/cacheService.js";

const getStatement = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id; // Предполагается, что userId берется из аутентификации
    const account = req.query.account as string;

    if (!userId || !account) {
      console.log("Невірні параметри запиту");
      res.status(400).json({ message: "Невірні параметри запиту" });
      return;
    }

    const transactions = await getTransactionsForUser(userId, account);
    res.json(transactions);
  } catch (error) {
    console.error("Помилка отримання транзакцій:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export default getStatement;
