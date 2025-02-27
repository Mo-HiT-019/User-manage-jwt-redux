import express from "express";
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes.js'
import authRoute from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import adminRoute from './routes/adminRoute.js'

dotenv.config()


const app =express();


app.use(cookieParser());

mongoose.set('strictQuery', false);
const connectDB = async () => { 
    try { 
        console.log("hi")
        await mongoose.connect(process.env.MONGO); 
        console.log('MongoDB connected successfully'); 
     } catch (err) {
         console.error('Error connecting to MongoDB:', err); process.exit(1); 
        }
}  
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  }));

app.listen(5000,()=>{
    console.log('Server on 5000')
});

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/admin',adminRoute);
  