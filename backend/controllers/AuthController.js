import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbClient from '../config/db';

class AuthController {
  static async register(request, response) {
    const { email, password } = request.body;

    try {
      // Check if the user already exists
      const existingUser = await dbClient.db.collection('users').findOne({ email });
      if (existingUser) {
        return response.status(400).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      await dbClient.db.collection('users').insertOne({
        email,
        password: hashedPassword,
      });

      // Respond with a success message
      return response.status(201).send('User registered successfully');
    } catch (err) {
      // Handle database errors
      return response.status(500).json({ error: 'Error registering user' });
    }
  }

  static async login(request, response) {
    const { email, password } = request.body;

    try {
      // Find the user by email
      const user = await dbClient.db.collection('users').findOne({ email });
      if (!user) return response.status(401).json({ error: 'Invalid email or password' });

      // Compare provided password with stored hashed password
      const match = await bcrypt.compare(password, user.password);
      if (!match) return response.status(401).json({ error: 'Invalid email or password' });

      // Generate a JWT token and return it in the response
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return response.json({ token });
    } catch (err) {
      // Handle errors during the login process
      return response.status(500).send('Error logging in');
    }
  }
}

export default AuthController;
