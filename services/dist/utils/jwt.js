"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signToken = (payload, expiresIn = '1h') => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn });
    // console.log('Generated token:', token);
    return token;
};
exports.signToken = signToken;
const verifyToken = (token) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    // console.log('JWT_SECRET inside verifyToken:', JWT_SECRET ? 'FOUND' : 'NOT FOUND');
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
};
exports.verifyToken = verifyToken;
