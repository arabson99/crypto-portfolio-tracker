import { expect } from 'chai';
import sinon from 'sinon';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import DBClient from '../../config/db';

describe('DBClient', () => {
  let mongoServer;
  let client;

  before(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Overwrite the DBClient with the in-memory database URI
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '27017';
    process.env.DB_DATABASE = 'test_crypto_portfolio_tracker';
    process.env.DB_URI = uri; 
  });

  beforeEach(() => {
    // Create a new instance of DBClient
    client = new DBClient();
  });

  after(async () => {
    // Stop the in-memory MongoDB server
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Close the MongoDB client
    await client.client.close();
  });

  it('should verify the database connection is alive', async () => {
    expect(client.isAlive()).to.be.true;
  });

  it('should return the correct number of users', async () => {
    const db = client.db;

    // Add mock users
    const usersCollection = db.collection('users');
    await usersCollection.insertMany([{ name: 'Alice' }, { name: 'Bob' }]);

    // Test nbUsers
    const count = await client.nbUsers();
    expect(count).to.equal(2);
  });

  it('should return the correct number of portfolios', async () => {
    const db = client.db;

    // Add mock portfolios
    const portfoliosCollection = db.collection('portfolios');
    await portfoliosCollection.insertMany([{ portfolio: 'Portfolio1' }, { portfolio: 'Portfolio2' }]);

    // Test nbPortfolios
    const count = await client.nbPortfolios();
    expect(count).to.equal(2);
  });

  it('should return the correct number of transactions', async () => {
    const db = client.db;

    // Add mock transactions
    const transactionsCollection = db.collection('transactions');
    await transactionsCollection.insertMany([{ transaction: 'Buy' }, { transaction: 'Sell' }]);

    // Test nbTransactions
    const count = await client.nbTransactions();
    expect(count).to.equal(2);
  });

  it('should handle errors in nbUsers gracefully', async () => {
    sinon.stub(client.db, 'collection').throws(new Error('Mocked error'));

    try {
      await client.nbUsers();
    } catch (err) {
      expect(err.message).to.equal('Mocked error');
    }
  });
});
