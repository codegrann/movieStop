import express from 'express';
import {
  registerUser,
  loginUser,
  googleAuthCallback,
} from '../controllers/authController.ts';
import passport from 'passport';

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);

authRoutes.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleAuthCallback
);

export default authRoutes;
