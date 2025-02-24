import { Request, Response } from "express";
import fetchClientInfo from "../services/clientInfo.js";

export default async function clientInfo(req: Request, res: Response) {
  try {
    const clientInfo = await fetchClientInfo(req, res);

    res.json(clientInfo);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання курсу валют" });
  }
}
