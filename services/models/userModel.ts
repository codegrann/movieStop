import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  googleId?: string;
  favorites: number[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for Google users
    name: { type: String, required: true },
    googleId: { type: String, unique: true, sparse: true },
    favorites: [{ type: Number }], // movie IDs user favorites
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
export { userSchema };
