import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config/index.js";

export function adminMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing or malformed",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
