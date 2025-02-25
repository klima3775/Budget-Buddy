import { Request, Response } from "express";
import fetchClientInfo from "../services/fetchClientInfo.js";

const getClientInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const clientInfo = await fetchClientInfo(req, res);
    res.json(clientInfo);
  } catch (error) {
    res.status(500).json({ message: "Помилка отримання даних клієнта" });
  }
};

export default getClientInfo;
