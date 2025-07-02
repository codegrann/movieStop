import jwt from 'jsonwebtoken';

export const signToken = (payload: object, expiresIn = '1h') => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  // console.log('Generated token:', token);
  return token;
};

export const verifyToken = (token: string) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  // console.log('JWT_SECRET inside verifyToken:', JWT_SECRET ? 'FOUND' : 'NOT FOUND');
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.verify(token, JWT_SECRET);
};
