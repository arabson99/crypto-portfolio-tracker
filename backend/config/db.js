import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'crypto_portfolio_tracker';

    const uri = `mongodb://${host}:${port}/${database}`;

    // Create MongoDB client
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to the database
    this.client.connect()
      .then(() => {
        console.log('MongoDB connected...');
        this.db = this.client.db(database);
      })
      .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
      });
  }

  // Check if the database connection is alive
  isAlive() {
    return this.client && this.client.topology && this.client.topology.isConnected();
  }

  // Get the number of users in the database
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // Get the number of portfolios in the database (if relevant)
  async nbPortfolios() {
    try {
      const portfoliosCollection = this.db.collection('portfolios');
      return await portfoliosCollection.countDocuments();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // Get the number of transactions (if relevant for portfolio tracking)
  async nbTransactions() {
    try {
      const transactionsCollection = this.db.collection('transactions');
      return await transactionsCollection.countDocuments();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
