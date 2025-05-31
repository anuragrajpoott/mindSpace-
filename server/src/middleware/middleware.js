import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
//     console.log("raw coookies:", req.cookies)
//     console.log("AUTH HEADER:", authHeader);
// console.log("EXTRACTED TOKEN in middleware:", token);
// console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(req.user,decoded)
    req.user = decoded;
    
    return next();

  } catch (error) {
    console.log(error)
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(403).json({
        success: false,
        message: "Token is invalid or expired",
        error:error.message

      });
    }
    return res.status(500).json({
      success: false,
      message: "Error while validating token",
      error: error.message,
    });
  }
};
