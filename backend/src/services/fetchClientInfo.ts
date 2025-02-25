import monoClient from "../client/monoClient.js";
import { Request, Response } from "express";
import User from "../model/user.js";
import { decryptToken } from "../utils/encription.js";

export default async function fetchClientInfo(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);

    if (!user || !user.token) {
      return res.status(400).json({ message: "Користувач не авторизований" });
    }

    const token = decryptToken(user.token);

    const response = await monoClient.get("/personal/client-info", {
      headers: {
        "X-Token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Помилка отримання інформації про клієнта");
  }
}
