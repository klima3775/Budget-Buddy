import express from "express";
import getCurrency from "../controllers/currencyController.js";
import getClientInfo from "../controllers/clientInfoController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import getStatement from "../controllers/transactionController.js";
import { getMonthlyStatistics } from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/currency", getCurrency);
router.get("/client-info", authMiddleware, getClientInfo);
router.get("/statement", authMiddleware, getStatement);
router.get("/statistics", authMiddleware, getMonthlyStatistics);

export default router;
