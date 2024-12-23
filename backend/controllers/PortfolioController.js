import dbClient from '../config/db';
import cryptoService from '../services/cryptoService';
import { ObjectId } from 'mongodb';

class PortfolioController {
  static async getAllPortfolios(request, response) {
    try {
      const portfolios = await dbClient.db.collection('portfolios').find({}).toArray();
      response.status(200).json(portfolios);
    } catch (err) {
      response.status(500).json({ error: 'Error fetching portfolios' });
    }
  }

  static async getPortfolioWithPrices(request, response) {
    try {
      const { portfolioId } = request.params; // Fetch portfolio ID from query params
      if (!portfolioId) {
        return response.status(400).json({ message: 'Portfolio ID is required' });
      }
  
      // Fetch the portfolio from the database
      const portfolio = await dbClient.db.collection('portfolios').findOne({ _id: new ObjectId(portfolioId) });
  
      if (!portfolio) {
        return response.status(404).json({ message: 'Portfolio not found' });
      }

      const { coins } = portfolio; // Array of coins with their amounts
  
     // Get prices for each coin in the portfolio
     const currentPrices = await Promise.all(
      coins.map(async (coin) => {
        const priceData = await cryptoService.getCurrentPrice(coin.symbol, 'usd'); // Fetch current price
        
        // Check if priceData is valid
        if (priceData === null) {
          return {
            symbol: coin.symbol,
            amount: coin.amount,
            currentPrice: null,
            totalValue: 0, // Handle missing price scenario
          };
        }

        const totalValue = priceData * coin.amount; // Calculate total value for that coin
        return {
          symbol: coin.symbol,
          amount: coin.amount,
          currentPrice: priceData, // Add current price
          totalValue: totalValue,
        };
      })
    );
  
      return response.status(200).json({ portfolioId, prices: currentPrices });
    } catch (error) {
      return response.status(500).json({ message: 'Error fetching portfolio prices', error: error.message });
    }
  }
  

  // Create a new portfolio
  static async createPortfolio(request, response) {
    try {
      const { name, coins } = request.body; // Expecting name and an array of coin objects
      if (!name || !coins) {
        return response
          .status(400)
          .json({ error: 'Portfolio name and coins are required.' });
      }
      const newPortfolio = {
        name,
        coins,
        createdAt: new Date(),
      };
      const result = await dbClient.db
        .collection('portfolios')
        .insertOne(newPortfolio);
      return response.status(201).json({ id: result.insertedId });
    } catch (err) {
      return response.status(500).json({ error: 'Error creating portfolio' });
    }
  }

  // Update an existing portfolio
  static async updatePortfolio(request, response) {
    try {
      const { id } = request.params;
      const { name, coins } = request.body; // Partial updates for name or coins
      if (!name && !coins) {
        return response.status(400).json({ error: 'Nothing to update.' });
      }
      const updateData = {};
      if (name) updateData.name = name;
      if (coins) updateData.coins = coins;

      const result = await dbClient.db
        .collection('portfolios')
        .updateOne({ _id: ObjectId(id) }, { $set: updateData });

      if (result.matchedCount === 0) {
        return response.status(404).json({ error: 'Portfolio not found.' });
      }
      return response.status(200).json({ message: 'Portfolio updated successfully.' });
    } catch (err) {
      return response.status(500).json({ error: 'Error updating portfolio' });
    }
  }

  // Delete a portfolio
  static async deletePortfolio(request, response) {
    try {
      const { id } = request.params;
      const result = await dbClient.db
        .collection('portfolios')
        .deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 0) {
        return response.status(404).json({ error: 'Portfolio not found.' });
      }
      return response.status(200).json({ message: 'Portfolio deleted successfully.' });
    } catch (err) {
      return response.status(500).json({ error: 'Error deleting portfolio' });
    }
  }
}


export default PortfolioController;
