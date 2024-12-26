import jwt from 'jsonwebtoken';

const authMiddleware = (request, response, next) => {
  const token = request.header('Authorization').split(' ')[1]; // Bearer token

  if (!token) {
    response.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; // Add the user information to the request object
    next();
  } catch (error) {
    response.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
