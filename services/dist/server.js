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
require("./utils/passportSetup");
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
    res.send(`
       <html>
         <head>
           <style>
             body { background-color: #282c34; color: white; font-family: monospace;
                display: flex; justify-content: center; align-items: center; height: 100vh; }
             #message{
               text-align: left;
               width: 100%;
               border: 2px solid red;
               margin-left: 10px;
               }
           </style>
         </head>
         <body>
          <h1 id="message"></h1>
          <script>
            const message = 'Your MovieApp Service is running';
            let dots = '';
            const el = document.getElementById('message');
            setInterval(() => {
              dots += '.';
              if (dots.length > 3) {
                dots = '.';
              }
              el.textContent = message + dots;
            }, 500);
          </script>
        </body>
      </html>
    `);
});
app.listen(PORT, () => {
    const message = `Server running on port ${PORT}`;
    let dots = '';
    setInterval(() => {
        dots += '.';
        if (dots.length > 3) {
            dots = '.';
        }
        process.stdout.write(`\r${message}${dots}`.padEnd(message.length + 3));
    }, 500);
    // console.log(`Server running on port ${PORT}`);
});
