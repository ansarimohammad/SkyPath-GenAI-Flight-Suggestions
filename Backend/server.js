import express from "express";
import startDatabase from "./config/mongoDB.js";
import authRoutes from "./routes/auth.js";
import flightRoutes from "./routes/flightCreation.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/flight", flightRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;

startDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
