import express from 'express';
import PortfolioController from '../controllers/PortfolioController';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


// Protected routes
router.use(authMiddleware); // Apply authMiddleware to protect the following routes

router.get('/portfolios', PortfolioController.getAllPortfolios);
router.get('/portfolio/:portfolioId/prices', PortfolioController.getPortfolioWithPrices);
router.post('/portfolios', PortfolioController.createPortfolio);
router.put('/portfolios/:portfolioId', PortfolioController.updatePortfolio);
router.delete('/portfolios/:id', PortfolioController.deletePortfolio);
router.delete('/user/:user_id', AuthController.deleteUser);
router.put('/user/:user_id', AuthController.updateUser);

export default router;
