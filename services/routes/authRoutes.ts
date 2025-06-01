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

authRoutes.get('/google', (req, res, next) => {
  console.log('Google OAuth started');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    console.log('Google OAuth callback, user:', req.user);
    googleAuthCallback(req, res);
  }
);


export default authRoutes;
