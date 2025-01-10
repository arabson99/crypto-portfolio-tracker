import jwt from 'jsonwebtoken';
import jwtSecret from '../config/secrets';

const authMiddleware = (request, response, next) => {
  // Get the authorization header
  const authHeader = request.header('Authorization');

  // Check if the token exists
  if (!authHeader) {
    return response.status(401).json({ message: 'No token provided' });
  }

  // Split the 'Bearer token' and get the token
  const token = authHeader.split(' ')[1];

  // If token is not in the correct format
  if (!token) {
    return response.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    request.user = decoded; // Attach the user info to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return response.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
