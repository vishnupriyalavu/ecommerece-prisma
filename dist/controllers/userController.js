"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "User creation failed" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid)
        return res.status(401).json({ message: "Invalid password" });
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
};
exports.login = login;
//# sourceMappingURL=userController.js.map