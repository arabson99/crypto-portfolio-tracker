
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserController from '../../controllers/UserController';
import dbClient from '../../config/db';
import jwtSecret from '../../config/secrets';

chai.use(sinonChai);

describe('UserController', () => {
  let mockRequest, mockResponse, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockRequest = {
      body: {},
      user: {},
    };
    mockResponse = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };
  });
  

  afterEach(() => {
    sandbox.restore();
  });

  describe('register', () => {
    it('should return 400 if email or password is missing', (done) => {
      mockRequest.body = {}; // No email or password

      UserController.register(mockRequest, mockResponse);

      expect(mockResponse.status).to.have.been.calledWith(400);
      expect(mockResponse.json).to.have.been.calledWith({ error: 'Incomplete details' });
      done();
    });

    it('should return 400 if the user already exists', (done) => {
      mockRequest.body = { email: 'test@example.com', password: 'password123' };

      // Mock database query
      sandbox.stub(dbClient.db.collection('users'), 'findOne').resolves({ email: 'test@example.com' });

      UserController.register(mockRequest, mockResponse);

      expect(mockResponse.status).to.have.been.calledWith(400);
      expect(mockResponse.json).to.have.been.calledWith({ error: 'User already exists' });
      done();
    });

    it('should return 201 when user is successfully registered', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'password123' };

      sandbox.stub(dbClient.db.collection('users'), 'findOne').resolves(null); // No existing user
      sandbox.stub(bcrypt, 'hash').resolves('hashedPassword'); // Mock password hashing
      sandbox.stub(dbClient.db.collection('users'), 'insertOne').resolves({ insertedId: 'userId' });

      await UserController.register(mockRequest, mockResponse);

      expect(mockResponse.status).to.have.been.calledWith(201);
      expect(mockResponse.send).to.have.been.calledWith('User registered successfully');
    });

    it('should return 500 on database error', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'password123' };

      sandbox.stub(dbClient.db.collection('users'), 'findOne').rejects(new Error('Database error'));

      await UserController.register(mockRequest, mockResponse);

      expect(mockResponse.status).to.have.been.calledWith(500);
      expect(mockResponse.json).to.have.been.calledWith({ error: 'Error registering user' });
    });
  });

  describe('login', () => {
    it('should return 401 if user is not found', async () => {
      mockRequest.body = { email: 'notfound@example.com', password: 'password123' };

      sandbox.stub(dbClient.db.collection('users'), 'findOne').resolves(null); // No user found

      await UserController.login(mockRequest, mockResponse);

      expect(mockResponse.status).to.have.been.calledWith(401);
      expect(mockResponse.json).to.have.been.calledWith({ error: 'Unauthorized' });
    });

    it('should return 401 if password is invalid', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'wrongpassword' };

      sandbox.stub(dbClient.db.collection('users'), 'findOne').resolves({ email: 'test@example.com', password: 'hashedPassword' });
      sandbox.stub(bcrypt, 'compare').resolves(false); // Password does not match

      await UserController.login(mockRequest, mockResponse);

      expect(mockResponse.status).to.have.been.calledWith(401);
      expect(mockResponse.json).to.have.been.calledWith({ error: 'Invalid password' });
    });

    it('should return a JWT token on successful login', async () => {
      mockRequest.body = { email: 'test@example.com', password: 'password123' };

      sandbox.stub(dbClient.db.collection('users'), 'findOne').resolves({ _id: 'userId', email: 'test@example.com', password: 'hashedPassword' });
      sandbox.stub(bcrypt, 'compare').resolves(true); // Password matches
      sandbox.stub(jwt, 'sign').returns('jwtToken');

      await UserController.login(mockRequest, mockResponse);

      expect(mockResponse.json).to.have.been.calledWith({ token: 'jwtToken' });
    });
  });

  describe('getMe', () => {
    it('should return 404 if user is not found', async () => {
      mockRequest.user = { userId: 'nonexistentUserId' };

      sandbox.stub(dbClient.db.collection('users'), 'find').resolves(null);

      await UserController.getMe(mockRequest, mockResponse);

      expect(mockResponse.status).to.have.been.calledWith(404);
      expect(mockResponse.json).to.have.been.calledWith({ error: 'User not found' });
    });

    it('should return user details if user exists', async () => {
      mockRequest.user = { userId: 'existingUserId' };

      sandbox.stub(dbClient.db.collection('users'), 'find').resolves({ _id: 'existingUserId', email: 'test@example.com' });

      await UserController.getMe(mockRequest, mockResponse);

      expect(mockResponse.json).to.have.been.calledWith({ _id: 'existingUserId', email: 'test@example.com' });
    });
  });
});