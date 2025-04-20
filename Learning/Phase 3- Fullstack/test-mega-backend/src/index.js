import app from "./app";
import connectDB from "./db/dbConnect.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PROT || 4000;

connectDB()
  .then(() => {
    app.listen(PROT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err, "Error connecting ");
    process.exit(1);
  });
