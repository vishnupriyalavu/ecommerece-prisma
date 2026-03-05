import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth";

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { paymentMethod, shippingAddress, items } = req.body;

  const order = await prisma.order.create({
    data: {
      userId: req.user.userId,
      paymentMethod,
      shippingAddress,
      expectedDelivery: new Date(),
      items: {
        create: items
      }
    },
    include: { items: true }
  });

  res.json(order);
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.userId },
    include: { items: true }
  });

  res.json(orders);
};