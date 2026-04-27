import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
};

export default dbConnect;
