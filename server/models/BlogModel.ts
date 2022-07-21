import mongoose from 'mongoose';
import { IBlog } from '../config/interface';
const BlogSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   title: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 50
   },
   content: {
      type: String,
      required: true,
      minLength: 2000,
   },
   description: {
      type: String,
      required: true,
      trim: true,
      minLength: 50,
      maxLength: 200
   },
   thumbnail: {
      type: String,
      required: true,
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
   }
}, { timestamps: true})


export default mongoose.model<IBlog>('Blog', BlogSchema);