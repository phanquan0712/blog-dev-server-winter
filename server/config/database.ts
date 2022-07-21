import mongoose from 'mongoose';

const URL = process.env.MONGODB_URL;

mongoose.connect(`${URL}`, {
   useCreateIndex: true,
   useFindAndModify:false,
   useNewUrlParser: true,
   useUnifiedTopology: true,
}, (err) => {
   if(err) throw err;
   console.log('MongoDB connected');
})