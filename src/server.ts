import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config(); 

const app= express();
app.use(cors());
app.use(bodyParser.json());

// connect to DB
connectDB();

const PORT= process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port :: ${PORT}`)
});