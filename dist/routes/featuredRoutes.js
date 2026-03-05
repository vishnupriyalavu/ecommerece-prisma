"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const featuredController_1 = require("../controllers/featuredController");
const router = express_1.default.Router();
// Add a featured product
router.post("/", featuredController_1.createFeatured);
// Get all featured products
router.get("/", featuredController_1.getFeatured);
exports.default = router;
//# sourceMappingURL=featuredRoutes.js.map