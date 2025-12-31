import express from "express";
import startDatabase from "./config/mongoDB.js";
import authRoutes from "./routes/auth.js";
import flightRoutes from "./routes/flightCreation.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());


if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    })
  );
}


app.use(async (req, res, next) => {
  try {
    await startDatabase();
    next();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/flight", flightRoutes);


app.get("/api/health", (req, res) => {
  res.json({ status: "API is running" });
});


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

export default app;
