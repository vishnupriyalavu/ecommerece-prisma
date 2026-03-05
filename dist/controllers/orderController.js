"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const prisma_1 = require("../lib/prisma");
const createOrder = async (req, res) => {
    const { paymentMethod, shippingAddress, items } = req.body;
    const order = await prisma_1.prisma.order.create({
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
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    const orders = await prisma_1.prisma.order.findMany({
        where: { userId: req.user.userId },
        include: { items: true }
    });
    res.json(orders);
};
exports.getOrders = getOrders;
//# sourceMappingURL=orderController.js.map