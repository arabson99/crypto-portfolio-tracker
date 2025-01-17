import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import axios from 'axios';
import rp from 'request-promise';
import cryptoService from '../../services/cryptoService'; 

chai.use(sinonChai);
const { expect } = chai;

describe('cryptoService', () => {
  afterEach(() => {
    sinon.restore(); // Restore stubs and spies after each test
  });

  describe('getAllCryptos', () => {
    it('should return the length of all cryptocurrencies when no name is provided', async () => {
      const mockResponse = JSON.stringify([{ name: 'Bitcoin' }, { name: 'Ethereum' }]);
      sinon.stub(rp, 'default').resolves(mockResponse);

      const result = await cryptoService.getAllCryptos();
      expect(result).to.equal(2);
    });

    it('should return true if the given cryptocurrency name exists', async () => {
      const mockResponse = JSON.stringify([{ name: 'Bitcoin' }, { name: 'Ethereum' }]);
      sinon.stub(rp, 'default').resolves(mockResponse);

      const result = await cryptoService.getAllCryptos('Bitcoin');
      expect(result).to.be.true;
    });

    it('should return false if the given cryptocurrency name does not exist', async () => {
      const mockResponse = JSON.stringify([{ name: 'Bitcoin' }, { name: 'Ethereum' }]);
      sinon.stub(rp, 'default').resolves(mockResponse);

      const result = await cryptoService.getAllCryptos('Litecoin');
      expect(result).to.be.false;
    });
  });

  describe('getCurrentPrice', () => {
    it('should return the current price of a cryptocurrency in USD', async () => {
      const mockResponse = { data: { bitcoin: { usd: 50000 } } };
      sinon.stub(axios, 'get').resolves(mockResponse);

      const result = await cryptoService.getCurrentPrice('bitcoin');
      expect(result).to.equal(50000);
    });

    it('should return null if the cryptocurrency price data is not found', async () => {
      const mockResponse = { data: {} };
      sinon.stub(axios, 'get').resolves(mockResponse);

      const result = await cryptoService.getCurrentPrice('bitcoin');
      expect(result).to.be.null;
    });

    it('should throw an error if there is a problem fetching the current price', async () => {
      sinon.stub(axios, 'get').rejects(new Error('Network Error'));

      await expect(cryptoService.getCurrentPrice('bitcoin')).to.be.rejectedWith('Unable to fetch current price');
    });
  });

  describe('getHistoricalData', () => {
    it('should return historical data for a cryptocurrency on a specific date', async () => {
      const mockResponse = { data: { market_data: { current_price: { usd: 30000 } } } };
      sinon.stub(axios, 'get').resolves(mockResponse);

      const result = await cryptoService.getHistoricalData('bitcoin', '01-01-2022');
      expect(result).to.deep.equal(mockResponse.data);
    });

    it('should throw an error if there is a problem fetching historical data', async () => {
      sinon.stub(axios, 'get').rejects(new Error('Network Error'));

      await expect(cryptoService.getHistoricalData('bitcoin', '01-01-2022')).to.be.rejectedWith('Unable to fetch historical data');
    });
  });

  describe('getMarketTrends', () => {
    it('should return market trends for the top 10 cryptocurrencies by default', async () => {
      const mockResponse = { data: [{ id: 'bitcoin' }, { id: 'ethereum' }] };
      sinon.stub(axios, 'get').resolves(mockResponse);

      const result = await cryptoService.getMarketTrends();
      expect(result).to.deep.equal(mockResponse.data);
    });

    it('should throw an error if there is a problem fetching market trends', async () => {
      sinon.stub(axios, 'get').rejects(new Error('Network Error'));

      await expect(cryptoService.getMarketTrends()).to.be.rejectedWith('Unable to fetch market trends');
    });
  });
});
