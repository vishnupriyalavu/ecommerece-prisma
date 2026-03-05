import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";

export const addToCart = async (req: AuthRequest, res: Response) => {
  const { productId, quantity } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) return res.status(404).json({ message: "Product not found" });

  const totalPrice = product.price * quantity;

  const cart = await prisma.cart.create({
    data: {
      userId: req.user.userId,
      items: {
        create: {
          productId,
          quantity,
          totalPrice
        }
      }
    },
    include: { items: true }
  });

  res.json(cart);
};

export const getCart = async (req: AuthRequest, res: Response) => {
  const cart = await prisma.cart.findMany({
    where: { userId: req.user.userId },
    include: { items: true }
  });

  res.json(cart);
};