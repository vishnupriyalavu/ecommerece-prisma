"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const prisma_1 = require("../lib/prisma");
const createProduct = async (req, res) => {
    const { title, description, productImg, price } = req.body;
    const product = await prisma_1.prisma.product.create({
        data: {
            title,
            description,
            productImg,
            price
        }
    });
    res.json(product);
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    const products = await prisma_1.prisma.product.findMany();
    res.json(products);
};
exports.getProducts = getProducts;
const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await prisma_1.prisma.product.findUnique({
        where: { id }
    });
    res.json(product);
};
exports.getProduct = getProduct;
//# sourceMappingURL=productController.js.map