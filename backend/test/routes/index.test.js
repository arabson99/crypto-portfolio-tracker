import chai from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import express from 'express';
import router from '../../routes/index'; 
import authMiddleware from '../../middlewares/authMiddleware';
import PortfolioController from '../../controllers/PortfolioController';
import UserController from '../../controllers/UserController';
import CryptoController from '../../controllers/CryptoController';

const { expect } = chai;

describe('Router Tests', () => {
  const app = express();
  app.use(express.json()); // Middleware to parse JSON
  app.use(router); // Attach the router to the app

  let authMiddlewareStub;

  beforeEach(() => {
    // Stub the authMiddleware to simulate authenticated requests
    authMiddlewareStub = sinon.stub(authMiddleware).callsFake((req, res, next) => {
      req.user = { userId: '12345', name: 'John Doe' };
      next();
    });
  });

  afterEach(() => {
    sinon.restore(); // Restore all stubs/mocks
  });

  describe('Public Routes', () => {
    it('should handle user registration', async () => {
      const registerStub = sinon.stub(UserController, 'register').resolves();
      const response = await supertest(app)
        .post('/register')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(registerStub.calledOnce).to.be.true;
      expect(response.status).to.equal(200); // Adjust expected status code
    });

    it('should handle user login', async () => {
      const loginStub = sinon.stub(UserController, 'login').resolves();
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(loginStub.calledOnce).to.be.true;
      expect(response.status).to.equal(200); // Adjust expected status code
    });
  });

  describe('Protected Routes', () => {
    it('should fetch all portfolios', async () => {
      const getAllPortfoliosStub = sinon.stub(PortfolioController, 'getAllPortfolios').resolves();
      const response = await supertest(app).get('/portfolios');

      expect(authMiddlewareStub.called).to.be.true;
      expect(getAllPortfoliosStub.calledOnce).to.be.true;
      expect(response.status).to.equal(200); // Adjust expected status code
    });

    it('should create a portfolio', async () => {
      const createPortfolioStub = sinon.stub(PortfolioController, 'createPortfolio').resolves();
      const response = await supertest(app)
        .post('/portfolios')
        .send({ name: 'My Portfolio', coins: [] });

      expect(authMiddlewareStub.called).to.be.true;
      expect(createPortfolioStub.calledOnce).to.be.true;
      expect(response.status).to.equal(200); // Adjust expected status code
    });

    it('should handle fetching crypto info', async () => {
      const getCryptosInfoStub = sinon.stub(CryptoController, 'getCryptosInfo').resolves();
      const response = await supertest(app).get('/cryptos');

      expect(authMiddlewareStub.called).to.be.true;
      expect(getCryptosInfoStub.calledOnce).to.be.true;
      expect(response.status).to.equal(200); // Adjust expected status code
    });
  });
});
