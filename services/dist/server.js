"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const passport_1 = __importDefault(require("passport"));
require("./utils/passportSetup.ts");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, db_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/movies', movieRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL, // Frontend URL
}));
app.get('/', (req, res) => {
    res.send('MovieApp Backend is running...');
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
