import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
dotenv.config();
connectDB();
 const app = express();
app.use(cors());
 app.use(express.json())
 app.use(morgan('dev'))

 app.use('/api/v1/auth',authRoutes);
 app.get("/",(req,res)=>{
    res.send({message: "welcome guys"})
   })

const PORT = process.env.PORT;
 app.listen(PORT,()=>{
    console.log(`server running ${PORT}`.bgCyan);
 })