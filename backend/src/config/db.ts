import mongoose from "mongoose";

const connectDB= async() => {
  try {
    const mongoURI= process.env.MONGO_URI;

    if(!mongoURI) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log("MongoDB connected successfully.")
  } catch (error) {
    console.log("MongoDB connection Err: ", error);
    process.exit(1);
  }
}

export default connectDB;