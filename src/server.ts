import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';

import itemRoutes from './routes/itemRoutes';
dotenv.config(); 

const app= express();
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// Mounting routes
app.use('/api', itemRoutes);

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port :: ${PORT}`)
});