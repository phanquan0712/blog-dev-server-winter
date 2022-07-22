import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes/index';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

// Middleware
const app = express();
app.use(cors({
   origin: `${process.env.BASE_URL}`,
   credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'))

// Socket.io
const http = createServer(app);
export const io = new Server(http, {
   cors: {
      origin: `${process.env.BASE_URL}`,
      credentials: true
   }
});
import { socketServer } from './config/socket';
io.on('connection', (socket: Socket) => {
   socketServer(socket)
})


// Routes
app.use('/api', routes.authRoute);  
app.use('/api', routes.userRoute);
app.use('/api', routes.categoryRoute);
app.use('/api', routes.blogRoute);
app.use('/api', routes.commentRoute);



// Database
import './config/database';




// Server listening
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
})