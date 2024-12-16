import dbClient from '../config/db';
import cryptoService from '../services/cryptoService';

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
      const { coinIds } = request.query; // Array of coin IDs, e.g., ['bitcoin', 'ethereum']
      if (!coinIds) {
        return response.status(400).json({ message: 'coinIds are required' });
      }

      const coinIdsArray = coinIds.split(',');  // Convert the string into an array

      const currentPrices = await Promise.all(
        coinIdsArray.map((coin) => cryptoService.getCurrentPrice(coin, 'usd')), // Fetch prices using cryptoService
      );
      return response.status(200).json({ prices: currentPrices });
    } catch (error) {
      return response.status(500).json({ message: 'Error fetching portfolio data' });
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
        .updateOne({ _id: id }, { $set: updateData });

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
        .deleteOne({ _id: id });
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
