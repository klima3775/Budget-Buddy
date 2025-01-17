import { connect } from "http2";
import mongoose from "mongoose";

connect(process.env.MONGO_URI || "");

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error("Unexpected error", err);
    }
    process.exit(1);
  }
};
