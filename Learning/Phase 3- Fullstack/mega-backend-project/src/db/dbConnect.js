import mongoose from "mongoose";

const  mongooseConnect = () => {
  return mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("Connected to mongodb successfully ");
    })
    .catch((error) => {
      console.log("Error connecting mongodb", error);
      process.exit(1);
    });
};

export default mongooseConnect;
