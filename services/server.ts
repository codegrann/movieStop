import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import passport from 'passport';
import './utils/passportSetup';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send(`
       <html>
         <head>
           <style>
             body { background-color: #282c34; color: white; font-family: monospace;
                display: flex; justify-content: center; padding-top: 20px; height: 100vh; }
             #message{
               text-align: left;
               width: 70%;
               margin-x: auto;
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
});
