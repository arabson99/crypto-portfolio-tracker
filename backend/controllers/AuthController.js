import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbClient from '../config/db';
import { ObjectId } from 'mongodb';


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

  static async deleteUser(request, response) {
    const { user_id } = request.params;
  
    try {
      // Find and delete user by user_id
      const result = await dbClient.db.collection('users').deleteOne({ _id: new ObjectId(user_id) });
  
      if (result.deletedCount === 0) {
        return response.status(404).json({ error: 'User not found' });
      }
  
      return response.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      return response.status(500).json({ error: 'Error deleting user' });
    }
  }

  static async updateUser(request, response) {
    const { user_id } = request.params;
    const { email, password } = request.body;
  
    try {
      // Find the user by user_id
      const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(user_id) });
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
  
      // Prepare the update data
      const updateData = {};
      if (email) updateData.email = email;
      if (password) {
        // Hash the new password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }
  
      // Update the user in the database
      const result = await dbClient.db.collection('users').updateOne(
        { _id: new ObjectId(user_id) },
        { $set: updateData }
      );
  
      if (result.matchedCount === 0) {
        return response.status(404).json({ error: 'User not found' });
      }
  
      return response.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
      return response.status(500).json({ error: 'Error updating user' });
    }
  }
  
  
}

export default AuthController;
