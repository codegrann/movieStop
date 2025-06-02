import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import authRoutes from './routes/authRoutes.ts';
import movieRoutes from './routes/movieRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import passport from 'passport';
import './utils/passportSetup.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
  })
);

app.get('/', (req, res) => {
  res.send('MovieApp Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
