import { registerUser, loginUser } from '../controllers/authController';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { signToken } from '../utils/jwt';

dotenv.config();

jest.mock('../models/userModel');
jest.mock('bcryptjs');
jest.mock('../utils/jwt');

const mockReq = (body = {}) => ({ body } as any);
const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('registerUser', () => {
  it('should register a new user and return a token', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPass');
  
    const mockUser = {
      _id: '1',
      email: 'test@test.com',
      name: 'Tester',
      save: jest.fn().mockResolvedValue(undefined),
    };
    (User as unknown as jest.Mock).mockImplementation(() => mockUser);
  
    (signToken as jest.Mock).mockReturnValue('token123');
  
    const req = mockReq({ email: 'test@test.com', password: 'pass', name: 'Tester' });
    const res = mockRes();
  
    await registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      token: 'token123',
      user: { id: '1', email: 'test@test.com', name: 'Tester' },
    });
  });
  
  it('should return error if user exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({});
  
    const req = mockReq({ email: 'test@test.com', password: 'pass', name: 'Tester' });
    const res = mockRes();
  
    await registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });
  
  it('should return 400 if fields are missing', async () => {
    const req = mockReq({ email: '', password: '', name: '' });
    const res = mockRes();
  
    await registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please enter all fields' });
  });
  
  it('should return 500 on server error', async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error('DB down'));
  
    const req = mockReq({ email: 'test@test.com', password: 'pass', name: 'Tester' });
    const res = mockRes();
  
    await registerUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Server error',
      error: 'DB down',
    });
  });
});

describe('loginUser', () => {
  it('should login a user with correct credentials', async () => {
    const mockUser = { password: 'hashed', _id: '1', email: 'a@b.com', name: 'User' };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (signToken as jest.Mock).mockReturnValue('token456');

    const req = mockReq({ email: 'a@b.com', password: 'pass' });
    const res = mockRes();

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token: 'token456',
      user: { id: '1', email: 'a@b.com', name: 'User' }
    });
  });

  it('should return error for invalid credentials', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const req = mockReq({ email: 'bad@user.com', password: 'pass' });
    const res = mockRes();

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });
});
