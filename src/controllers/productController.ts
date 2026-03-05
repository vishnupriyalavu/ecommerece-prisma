import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createProduct = async (req: Request, res: Response) => {
  const { title, description, productImg, price } = req.body;

  const product = await prisma.product.create({
    data: {
      title,
      description,
      productImg,
      price
    }
  });

  res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getProduct = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id }
  });

  res.json(product);
};