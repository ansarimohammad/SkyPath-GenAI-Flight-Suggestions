import mongoose from "mongoose";

const startDatabase =  async () => {
  let dbConnection;

  try {
    dbConnection = await mongoose.connect(process.env.MONGODB_URI);
  } catch (connectionError) {
    console.error("Failed to connect to MongoDB:", connectionError.message);
    process.exit(1);
  }

  console.log(
    `MongoDB connected successfully on host: ${dbConnection.connection.host}:${dbConnection.connection.port}`
  );
};

export default startDatabase;
