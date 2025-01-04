import express from 'express';
import PortfolioController from '../controllers/PortfolioController';
import UserController from '../controllers/UserController';
import CryptoController from '../controllers/CryptoController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Public routes
router.post('/register', UserController.register);
router.get('/login', UserController.login);

// Protected routes
router.use(authMiddleware); // Apply authMiddleware to protect the following routes

router.get('/portfolios', PortfolioController.getAllPortfolios);
router.get('/portfolio/:portfolioId/prices', PortfolioController.getPortfolioWithPrices);
router.post('/portfolios', PortfolioController.createPortfolio);
router.put('/portfolios/:portfolioId', PortfolioController.updatePortfolio);
router.delete('/portfolio/:id', PortfolioController.deletePortfolio);
router.get('/user/me', UserController.getMe)
router.put('/user/me', UserController.updateUser);
router.delete('/user/me', UserController.deleteUser);
router.get('/cryptos', CryptoController.getCryptosInfo);
router.get('/cryptos/:cryptoName', CryptoController.getCryptosInfo);
router.get('/user/me/coins', CryptoController.getAllCoins)
router.post('/user/me/coins/:cryptoName', CryptoController.addCoin);
router.delete('/user/me/coins/:cryptoName', CryptoController.deleteCoin)

export default router;
