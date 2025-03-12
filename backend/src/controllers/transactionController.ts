import { Request, Response } from "express";
import monoClient from "../client/monoClient.js";
import User from "../model/user.js";
import { decryptToken } from "../utils/encription.js";

export const getStatement = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { from, to } = req.query;

  if (!from || !to) {
    res.status(400).json({ message: "Параметри 'from' та 'to' обов'язкові" });
    return;
  }

  try {
    const userId = (req as any).user.id; // Предполагается, что userId доступен в req.user
    const user = await User.findById(userId);

    if (!user || !user.token) {
      res.status(401).json({ message: "Користувач не авторизований" });
      return;
    }

    const token = decryptToken(user.token);

    const response = await monoClient.get(`/personal/statement/${from}/${to}`, {
      headers: {
        "X-Token": token,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Помилка отримання виписки:", error);
    res.status(500).json({ message: "Помилка отримання виписки", error });
  }
};
