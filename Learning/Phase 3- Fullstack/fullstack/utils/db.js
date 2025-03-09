import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to mongoose");
    })
    .catch(() => {
      console.log("Failed connecting to mongoose");
    });
};

export default db;
