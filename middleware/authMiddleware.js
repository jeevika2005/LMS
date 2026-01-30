import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

/* =======================
   PROTECT (JWT VERIFY)
======================= */
export const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_secret_key"
      );

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

/* =======================
   ADMIN ONLY
======================= */
export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

/* =======================
   STUDENT ONLY
======================= */
export const studentOnly = (req, res, next) => {
  if (req.user?.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Students only" });
  }
};
