import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbClient from '../config/db';

class AuthController {
  static async register(request, response) {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await dbClient.db.collection('users').insertOne({
        email,
        password: hashedPassword,
      });
      response.status(201).send('User registered');
    } catch (err) {
      response.status(500).json({ error: 'Error registering user' });
    }
  }

  static async login(request, response) {
    const { email, password } = request.body;
    try {
      const user = await dbClient.db.collection('users').findOne({ email });
      if (!user) return request.status(401).json({ error: 'Invalid email or password' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return response.status(401).json({ error: 'Invalid email or password' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return response.json({ token });
    } catch (err) {
      return response.status(500).send('Error loggin in');
    }
  }
}

export default AuthController;
