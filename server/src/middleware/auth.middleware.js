import jwt from 'jsonwebtoken';

const getCandidateSecrets = () => [
  process.env.ACCESS_TOKEN_SECRET,
  process.env.JWT_SECRET,
  process.env.REFRESH_TOKEN_SECRET,
  'access-secret',
  'refresh-secret',
].filter(Boolean);

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const parts = authHeader.trim().split(/\s+/);

    if (parts.length !== 2 || !/^(Bearer|bearer)$/i.test(parts[0])) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = parts[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    let decoded;
    let lastError;

    for (const secret of getCandidateSecrets()) {
      try {
        decoded = jwt.verify(token, secret);
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!decoded) {
      throw lastError || new Error('Token verification failed');
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
