import express from "express";
import getCurrency from "../controllers/currencyController.js";
import getClientInfo from "../controllers/clientInfoController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { getStatement } from "../controllers/transactionController.js";

const router = express.Router();

router.get("/currency", getCurrency);
router.get("/client-info", authMiddleware, getClientInfo);
router.get("/statement", authMiddleware, getStatement);

export default router;
