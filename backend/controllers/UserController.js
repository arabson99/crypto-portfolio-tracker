import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dbClient from '../config/db';
import jwtSecret from '../config/secrets';

class UserController {
  static async register(request, response) {
    const { email, password } = request.body;

    try {
      // Check if all informations are provided
      if (!email || !password) {
        return response.status(400).json({
          error: 'Incomplete details',
        }).end();
      }
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
      if (!user) return response.status(401).json({ error: 'Unauthorized' });

      // Compare provided password with stored hashed password
      const match = await bcrypt.compare(password, user.password);
      if (!match) return response.status(401).json({ error: 'Invalid password' });

      // Generate a JWT token and return it in the response
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
      return response.json({
        token,
        Message: 'Use this token to perform all operations on your account',
      });
    } catch (err) {
      // Handle errors during the login process
      return response.status(501).send('Error');
    }
  }

  static async getMe(req, res) {
    // To get a user's Infoemations
    const { userId } = req.user
    const user = await dbClient.db.collection('users').find({_id: ObjectId(userId)});
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user).end();
  }

  static async deleteUser(request, response) {
    // To delete a user

    const id = request.user.userId;
    try {
      // Find and delete user by user_id
      const result = await dbClient.db.collection('users').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return response.status(404).json({ error: 'User not found' });
      }

      return response.status(204).json({ message: 'Deleted successfully' });
    } catch (err) {
      return response.status(500).json({ error: 'Error deleting user' });
    }
  }

  static async updateUser(request, response) {
    // To update a user email or password
    const id = request.user.userId;
    const { email, password } = request.body;

    try {
      // Find the user by user_id
      const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(id) });
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      // Prepare the update data
      const updateData = {};
      if (email) {
        const existingUser = await dbClient.db.collection('users').findOne({ email });
        if (existingUser) {
          return response.status(400).json({ error: 'Email already taken' });
        }
        updateData.email = email;
      }
      if (password) {
        // Hash the new password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }
      // Check if the data to update is empty ---------------------------------- READ

      // Update the user in the database
      const result = await dbClient.db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
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

export default UserController;
