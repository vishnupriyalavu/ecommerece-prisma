import express from "express";
import { createOrder, getOrders } from "../controllers/orderController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);

export default router;