import express from 'express';
import PortfolioController from '../controllers/PortfolioController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/portfolios', PortfolioController.getAllPortfolios);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;
