import { signToken, verifyToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
  }));
  
describe('signToken', () => {
  it('should sign and return a token', () => {
    (jwt.sign as jest.Mock).mockReturnValue('signedtoken');
    const token = signToken('123');
    expect(token).toBe('signedtoken');
  });
});

describe('verifyToken', () => {
  it('should verify and return decoded token', () => {
    (jwt.verify as jest.Mock).mockReturnValue({ id: '123' });
    const decoded = verifyToken('token');
    expect(decoded).toEqual({ id: '123' });
  });

  it('should throw error on invalid token', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => { throw new Error('Invalid') });
    expect(() => verifyToken('badtoken')).toThrow('Invalid');
  });
});
