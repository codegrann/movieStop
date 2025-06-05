import { protect } from '../middleware/authMiddleware';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('jsonwebtoken');

describe('protect middleware', () => {
  it('should attach user and call next on valid token', () => {
    const req: any = {
      headers: { authorization: 'Bearer validtoken' }
    };
    const res: any = {};
    const next = jest.fn();
    (jwt.verify as jest.Mock).mockReturnValue({ id: '123' });

    protect(req, res, next);

    expect(req.user).toEqual({ id: '123' });
    expect(next).toHaveBeenCalled();
  });

  it('should reject request with no token', () => {
    const req: any = { headers: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'No token, authorization denied' });
  });
});
