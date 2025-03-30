import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((error) => {
      console.log(`Error connecting to db ${error}`);
    });
};
export default db;
