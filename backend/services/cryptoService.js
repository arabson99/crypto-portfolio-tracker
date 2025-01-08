import axios from 'axios';
import rp from 'request-promise';

const BASE_URL = 'https://api.coingecko.com/api/v3';

class cryptoService {
  static async getAllCryptos(cryptoName = null) {
    // To get the names of all the crypto currencies and check the given one
    const res = await rp(`${BASE_URL}/coins/list`);
    const coinList = JSON.parse(res);
    // check each coin data if the given cryptoname is present
    if (cryptoName === null) { return coinList.length; }
    for (const coin of coinList) {
      if (coin.name === cryptoName) { return true; }
    }
    return false;
  }

  static async getCurrentPrice(coinId, currency = 'usd') {
    try {
      const response = await axios.get(`${BASE_URL}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: currency,
        },
      });
      console.log(response);
      // Check if the response structure is valid
      if (response.data && response.data[coinId] && response.data[coinId][currency]) {
        return response.data[coinId][currency];
      }
      console.error(`Price data for ${coinId} in ${currency} not found`);
      return null;
    } catch (err) {
      console.error('Error fetching current price', err.message);
      throw new Error('Unable to fetch current price');
    }
  }

  static async getHistoricalData(coinId, date) {
    try {
      const response = await axios.get(`${BASE_URL}/coins/${coinId}/history`, {
        params: { date },
      });
      return response.data;
    } catch (err) {
      console.log('Error fetching historical data:', err.message);
      throw new Error('Unable to fetch historical data');
    }
  }

  static async getMarketTrends(limit = 10) {
    try {
      const response = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching market trends:', error.message);
      throw new Error('Unable to fetch market trends');
    }
  }
}

export default cryptoService;
