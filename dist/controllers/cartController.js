"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.addToCart = void 0;
const prisma_1 = require("../lib/prisma");
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const product = await prisma_1.prisma.product.findUnique({
        where: { id: productId }
    });
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    const totalPrice = product.price * quantity;
    const cart = await prisma_1.prisma.cart.create({
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
exports.addToCart = addToCart;
const getCart = async (req, res) => {
    const cart = await prisma_1.prisma.cart.findMany({
        where: { userId: req.user.userId },
        include: { items: true }
    });
    res.json(cart);
};
exports.getCart = getCart;
//# sourceMappingURL=cartController.js.map