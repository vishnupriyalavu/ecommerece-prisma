import express from "express";
import { addToCart, getCart } from "../controllers/cartController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);

export default router;