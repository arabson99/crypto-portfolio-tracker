import jwt from 'jsonwebtoken';
import jwtSecret from '../config/secrets';

const authMiddleware = (request, response, next) => {
  const token = request.header('Authorization').split(' ')[1]; // Bearer token

  if (!token) {
    response.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    request.user = decoded; // Add the user information to the request object
    next();
  } catch (error) {
    response.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
