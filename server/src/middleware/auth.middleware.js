import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';


export const protect = asyncHandler(async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret is not configured' });
  }

  const authHeader = req.headers.authorization || '';
  const parts = authHeader.trim().split(/\s+/);

  if (parts.length !== 2 || !/^(Bearer|bearer)$/i.test(parts[0])) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = parts[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
});
