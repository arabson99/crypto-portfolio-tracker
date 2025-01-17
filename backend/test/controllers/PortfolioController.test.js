import { expect } from 'chai';
import sinon from 'sinon';
import PortfolioController from '../../controllers/PortfolioController';
import dbClient from '../../config/db';

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe('PortfolioController', () => {
  afterEach(() => {
    sinon.restore(); 
  });

  describe('getAllPortfolios', () => {
    it('should return all portfolios for a user', async () => {
      const req = { user: { userId: '1234567890abcdef12345678' } }; // Mocked request
      const res = mockResponse();

      // Mock MongoDB collection behavior
      const portfoliosMock = [
        { name: 'Portfolio 1', coins: [] },
        { name: 'Portfolio 2', coins: [{ symbol: 'BTC', amount: 2 }] },
      ];
      const findStub = sinon.stub().returns({
        toArray: sinon.stub().resolves(portfoliosMock),
      });
      sinon.stub(dbClient.db, 'collection').returns({ find: findStub });

      await PortfolioController.getAllPortfolios(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(portfoliosMock)).to.be.true;
    });

    it('should handle errors during fetching', async () => {
      const req = { user: { userId: '1234567890abcdef12345678' } };
      const res = mockResponse();

      // Simulate an error
      const findStub = sinon.stub().throws(new Error('DB error'));
      sinon.stub(dbClient.db, 'collection').returns({ find: findStub });

      await PortfolioController.getAllPortfolios(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: 'Error fetching portfolios' })).to.be.true;
    });
  });

  describe('createPortfolio', () => {
    it('should create a new portfolio and return its ID', async () => {
      const req = {
        user: { userId: '1234567890abcdef12345678' },
        body: { name: 'New Portfolio', coins: [{ symbol: 'ETH', amount: 10 }] },
      };
      const res = mockResponse();

      const insertResult = { insertedId: 'abcdef1234567890abcdef12' };
      const insertOneStub = sinon.stub().resolves(insertResult);
      sinon.stub(dbClient.db, 'collection').returns({ insertOne: insertOneStub });

      await PortfolioController.createPortfolio(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: insertResult.insertedId })).to.be.true;
    });

    it('should return 400 if the portfolio name is missing', async () => {
      const req = { user: { userId: '1234567890abcdef12345678' }, body: { coins: [] } };
      const res = mockResponse();

      await PortfolioController.createPortfolio(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: 'Portfolio name is required.' })).to.be.true;
    });

    it('should handle errors during creation', async () => {
      const req = {
        user: { userId: '1234567890abcdef12345678' },
        body: { name: 'Portfolio with Error', coins: [] },
      };
      const res = mockResponse();

      const insertOneStub = sinon.stub().throws(new Error('DB error'));
      sinon.stub(dbClient.db, 'collection').returns({ insertOne: insertOneStub });

      await PortfolioController.createPortfolio(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: 'Error creating portfolio' })).to.be.true;
    });
  });
});
