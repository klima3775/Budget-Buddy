import { Request, Response } from "express";
import getCurrencyRates from "../services/currencyService.js";

export default async function getCurrency(req: Request, res: Response) {
  try {
    const rates = await getCurrencyRates();

    res.json(rates);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання курсу валют" });
  }
}
