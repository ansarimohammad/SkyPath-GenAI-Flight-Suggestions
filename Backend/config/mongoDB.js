import mongoose from "mongoose";

let isConnected = false;

const startDatabase = async () => {
  if (isConnected) return console.log("MongoDB already connected");

  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log("MongoDB connected");
};

export default startDatabase;
