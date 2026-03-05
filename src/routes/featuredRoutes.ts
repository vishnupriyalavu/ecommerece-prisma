import express from "express";
import { createFeatured, getFeatured } from '../controllers/featuredController';

const router = express.Router();

// Add a featured product
router.post("/", createFeatured);

// Get all featured products
router.get("/", getFeatured);

export default router;