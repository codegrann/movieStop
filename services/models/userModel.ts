import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string; // optional for Google users
  name: string;
  googleId?: string;
  favorites: number[]; // movie IDs user favorites
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true },
    favorites: [{ type: Number }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
