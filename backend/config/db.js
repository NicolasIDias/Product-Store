import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    throw new error();
  }
};
