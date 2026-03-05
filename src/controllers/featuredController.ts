import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// Create a featured product
export const createFeatured = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;

    const featured = await prisma.featured.create({
      data: {
        productId
      }
    });

    res.status(201).json(featured);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create featured product" });
  }
};

// Get all featured products
export const getFeatured = async (req: Request, res: Response) => {
  try {
    const featuredProducts = await prisma.featured.findMany({
      include: {
        product: true
      }
    });

    res.json(featuredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch featured products" });
  }
};