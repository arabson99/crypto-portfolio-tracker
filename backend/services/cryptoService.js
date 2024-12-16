const axios = require('axios');

const BASE_URL = 'https://api.coingecko.com/api/v3';

const getCurrentPrice = async (coinId, currency = 'usd') => {
    try {
        const response = await axios.get(`${BASE_URL}/simple/price`, {
            params: {
                ids: coinId,
                vs_currencies: currency,
            },
        });
        return response.data[coinId][currency];
    } catch (err) {
        console.error('Error fetching current price', err.message);
        throw new Error('Unable to fetch current price');
    }
};

const getHistoricalData = async (coinId, date) => {
    try {
        const response = await axios.get(`${BASE_URL}/coins/${coinId}/history`, {
            params: { date },
        });
        return response.data;
    } catch (err) {
        console.log('Error fetching historical data:', err.message);
        throw new Error('Unable to fetch historical data');
    }
};

const getMarketTrends = async (limit = 10) => {
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
};

module.exports = {
    getCurrentPrice,
    getHistoricalData,
    getMarketTrends,
};