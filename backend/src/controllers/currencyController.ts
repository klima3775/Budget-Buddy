import { Request, Response } from "express";
import getCurrencyRates from "../services/currencyService.js";

export default async function getCurrency(req: Request, res: Response) {
  try {
    console.log("Получен запрос на получение курсов валют");
    const rates = await getCurrencyRates();
    console.log("Курсы валют успешно получены:", rates);
    res.json(rates);
  } catch (error) {
    console.error("Ошибка при получении курсов валют:", error);
    res.status(500).json({ message: "Помилка отримання курсу валют" });
  }
}
