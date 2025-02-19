import express from "express";
import getCurrency from "../controllers/currencyController.js";
import clientInfo from "../controllers/clientInfoController.js";

const router = express.Router();

router.get("/currency", getCurrency);
router.get("/client-info", clientInfo);

export default router;
