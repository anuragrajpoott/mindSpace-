import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Middleware to authenticate users based on JWT.
 * Token can be passed via:
 * - Cookie: req.cookies.token
 * - Header: Authorization: Bearer <token>
 * - Query param (optional fallback): ?token=
 */
export const authenticateUser = (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Token not provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      userName: decoded.userName,
      role: decoded.role || 'user', // future-proofing for role-based access
    };

    next();
  } catch (error) {
    console.error('Authentication Error:', error);

    let message = 'Unauthorized';
    if (error.name === 'TokenExpiredError') message = 'Token expired';
    else if (error.name === 'JsonWebTokenError') message = 'Invalid token';

    return res.status(401).json({ success: false, message });
  }
};

/**
 * Helper function to extract token from request.
 */
const extractToken = (req) => {
  if (req.cookies?.token) return req.cookies.token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  if (req.query?.token) return req.query.token;

  return null;
};




export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient permissions',
      });
    }
    next();
  };
};

