
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.cookies.token ||
      req.body.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while validating token",
    });
  }
};
