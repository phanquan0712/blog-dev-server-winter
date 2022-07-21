import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      require: [true, 'Please add a name'],
      unique: true,
      maxLength: [50, 'Name is up to 50 chars long']
   }
}, { timestamps: true });

export default mongoose.model('categories', categorySchema);