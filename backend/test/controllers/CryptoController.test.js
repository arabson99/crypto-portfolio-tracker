import { expect } from 'chai';
import sinon from 'sinon';
import { ObjectId } from 'mongodb';
import CryptoController from '../../controllers/CryptoController';
import dbClient from '../../config/db';
import cryptoService from '../../services/cryptoService';

describe('CryptoController', () => {
  beforeEach(() => {
      // Stub dbClient.db and collection method
      sinon.stub(dbClient, 'db').value({
        collection: sinon.stub(),
      });
  });
  afterEach(() => {
    sinon.restore(); // Restore all stubs/mocks
  });

  describe('getCryptosInfo', () => {
    it('should return 404 if user is not found', async () => {
      const req = { user: { userId: '123' }, params: { cryptoName: 'Bitcoin' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(dbClient.db.collection('users'), 'findOne').resolves(null);

      await CryptoController.getCryptosInfo(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: 'User not found' })).to.be.true;
    });

    it('should return coins information if cryptoName is not provided', async () => {
      const req = { user: { userId: '123' }, params: {} };
      const res = {
        send: sinon.stub(),
      };

      sinon.stub(dbClient.db.collection('users'), 'findOne').resolves({ _id: new ObjectId('123') });
      sinon.stub(cryptoService, 'getAllCryptos').resolves(5000);

      await CryptoController.getCryptosInfo(req, res);

      expect(res.send.calledWith('There are 5000 coins available to add')).to.be.true;
    });

    it('should return that cryptoName can be added to the coin list', async () => {
      const req = { user: { userId: '123' }, params: { cryptoName: 'Bitcoin' } };
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub(),
      };

      sinon.stub(dbClient.db.collection('users'), 'findOne').resolves({ _id: new ObjectId('123') });
      sinon.stub(cryptoService, 'getAllCryptos').resolves(true);

      await CryptoController.getCryptosInfo(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith('Bitcoin can be added to your coin list')).to.be.true;
    });

    it('should handle errors gracefully', async () => {
      const req = { user: { userId: '123' }, params: { cryptoName: 'Bitcoin' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      sinon.stub(dbClient.db.collection('users'), 'findOne').throws(new Error('Database error'));

      await CryptoController.getCryptosInfo(req, res);

      expect(res.status.calledWith(501)).to.be.true;
      expect(res.json.calledWith({ error: 'An error occured try again' })).to.be.true;
    });
  });
});
