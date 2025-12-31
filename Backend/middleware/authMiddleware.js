import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Unauthorized - No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
