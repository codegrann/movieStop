import type { Request, Response } from 'express';
import User from '../models/userModel.ts';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { signToken } from '../utils/jwt.ts';
import axios from 'axios';

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res.status(400).json({ message: 'Please enter all fields' });

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashed, name });
    await user.save();

    const token = signToken({ id: user._id, email: user.email });
    
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message || error.toString() });

  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Please enter all fields' });

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken({ id: user._id, email: user.email });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message || error.toString() });
  }
};

// passport middleware handles Google OAuth callback
export const googleAuthCallback = async (req: any, res: any) => {
  // Passport attaches user to req.user
  if (!req.user) {
    // console.log('No user from Google OAuth');
    return res.redirect('/login?error=auth_failed');
  }

  try {
    const accessToken = req.user.accessToken;
    let userInfo;

    if (accessToken) {
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      );
      userInfo = response.data; 
    }

    const name = userInfo?.name || req.user.name || '';

    const token = signToken({ id: req.user._id, email: req.user.email, name });
    // console.log('Google Auth Generated Token:', token);

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  } catch (error) {
    // console.error('Error fetching Google userinfo:', error);
    // fallback
    const token = signToken({ id: req.user._id, email: req.user.email, name: req.user.name || '' });
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
};
