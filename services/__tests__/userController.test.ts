import { addFavorite, removeFavorite, getFavorites, updateAccount, deleteAccount } from '../controllers/userController';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('../models/userModel');

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// describe('getUserProfile', () => {
//   it('should return user profile if found', async () => {
//     const req: any = { user: { id: '123' } };
//     const res = mockRes();

//     (User.findById as jest.Mock).mockResolvedValue({ id: '123', email: 'test@test.com' });

//     await getUserProfile(req, res);

//     expect(res.json).toHaveBeenCalledWith({ id: '123', email: 'test@test.com' });
//   });

//   it('should return 404 if user not found', async () => {
//     const req: any = { user: { id: '123' } };
//     const res = mockRes();
//     (User.findById as jest.Mock).mockResolvedValue(null);

//     await getUserProfile(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
//   });
// });

describe('updateAccount', () => {
  it('should update and return the user profile', async () => {
    const save = jest.fn().mockResolvedValue(undefined);
    const mockUser = { name: 'Old', email: 'old@test.com', save };
    const req: any = { user: { id: '123' }, body: { name: 'New' } };
    const res = mockRes();

    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    await updateAccount(req, res);

    expect(save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'Account updated successfully' });
});
});

describe('deleteAccount', () => {
  it('should delete user and respond with message', async () => {
    const deleteOne = jest.fn().mockResolvedValue(undefined);
    const mockUser = { deleteOne };
    const req: any = { user: { id: '123' } };
    const res = mockRes();
  
    (User.findById as jest.Mock).mockResolvedValue(mockUser);
  
    await deleteAccount(req, res);
  
    expect(deleteOne).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: 'Account deleted successfully' });
});
  
  it('should return error if user not found', async () => {
    const req: any = { user: { id: '123' } };
    const res = mockRes();
  
    (User.findById as jest.Mock).mockResolvedValue(null);
  
    await deleteAccount(req, res);
  
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
  
  it('should handle server error', async () => {
    const req: any = { user: { id: '123' } };
    const res = mockRes();
  
    (User.findById as jest.Mock).mockRejectedValue(new Error('DB fail'));
  
    await deleteAccount(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Failed to delete account',
      error: 'DB fail',
    });
  });
});
  
