import mongoose from 'mongoose';
import { IUser } from '../config/interface'
const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
      maxLength: [20, 'Name must be less than 20 characters'],
   },
   account: {
      type: String,
      required: [true, 'Please add your email or phone'],
      trim: true,
      unique: [true, 'This account has been registered'],
   },
   password: {
      type: String,
      required: [true, 'Please add your password'],
      minLength: [6, 'Your name is up to 20 chars long.'],
   },
   avatar: {
      type: String,
      default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
   },
   role: {
      type: String,
      default: 'user', // admin
   },
   type: {
      type: String,
      default: 'register', // login
   },
   rf_token: { type: String, select: false }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);