import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config/index.js";

export function userMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token is missing or malformed",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expire token" });
  }
}
