import { ObjectId } from 'mongodb';
import dbClient from '../config/db';
import cryptoService from '../services/cryptoService';

class CryptoController {
  static async getCryptosInfo(req, res) {
    // To check if a particular crypto_currency can be added to a user portfolio
    const { userId } = req.user;
    const { cryptoName } = req.params;
    // Get and check for the current user
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    try {
      const Coinsinfo = await cryptoService.getAllCryptos(cryptoName);
      if (cryptoName === undefined) {
        return res.send(`There are ${Coinsinfo} coins available to add`);
      }
      if (Coinsinfo === true) {
        return res.status(200).send(`${cryptoName} can be added to your coin list`);
      }
      return res.status(200).send(`${cryptoName} is not a supported crypto type`);
    } catch (err) {
      return res.status(501).json({
        error: 'An error occured try again',
      }).end();
    }
  }

  static async getAllCoins(req, res) {
    // To get the coins of a user
    const { userId } = req.user;
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.coins === undefined) {
      return res.send('You have no coins');
    }
    return res.json(user.coins).end();
  }

  static async addCoin(req, res) {
    // verify the user using the user id
    const { userId } = req.user;
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    try {
      const { cryptoName } = req.params;
      // check if the crypto currency can be added
      if (await cryptoService.getAllCryptos(cryptoName) !== true) {
        return res.status(400).json({
          error: 'The crypto currency cant be found',
        }).end();
      }
      // update the database by adding the crypto currency to the curencies in the user DB document
      const addedCoins = await dbClient.db.collection('users').updateOne(
        { _id: user._id },
        { $addToSet: { coins: cryptoName } }
      );
      if (addedCoins.modifiedCount === 0) {
        return res.send(`${cryptoName} is already in your coins list`);
      }
      return res.send(`${cryptoName} has been added to your coin  list`);
    } catch (err) {
      return res.status(501).json({
        error: 'An error occured try again'
      }).end();
    }
  }

  static async deleteCoin(req, res) {
    // check if the user is valid
    const { userId } = req.user;
    const user = await dbClient.db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // delete the coin from the array in the users documents
    const { cryptoName } = req.params;
    const removed = await dbClient.db.collection('users').updateOne(
      { _id: user._id },
      { $pull: { coins: cryptoName } },
    );
    if (removed.modifiedCount === 0) {
      return res.send(`${cryptoName} is not a part of your coins`);
    }
    return res.send(`${cryptoName} has sucessfully being removed from your coin list`);
  }
}

export default CryptoController;
