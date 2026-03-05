"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatured = exports.createFeatured = void 0;
const prisma_1 = require("../lib/prisma");
// Create a featured product
const createFeatured = async (req, res) => {
    try {
        const { productId } = req.body;
        const featured = await prisma_1.prisma.featured.create({
            data: {
                productId
            }
        });
        res.status(201).json(featured);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create featured product" });
    }
};
exports.createFeatured = createFeatured;
// Get all featured products
const getFeatured = async (req, res) => {
    try {
        const featuredProducts = await prisma_1.prisma.featured.findMany({
            include: {
                product: true
            }
        });
        res.json(featuredProducts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch featured products" });
    }
};
exports.getFeatured = getFeatured;
//# sourceMappingURL=featuredController.js.map