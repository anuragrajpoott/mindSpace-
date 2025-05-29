import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("✅ Database connected");
    })
    .catch((error) => {
      console.error("❌ Error connecting to database:", error);
      process.exit(1);
    });
};

export default dbConnect;
