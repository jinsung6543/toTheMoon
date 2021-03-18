import express from 'express';
import {
  buyStock,
  sellStock,
  getOrderById,
  getPortfolio,
} from '../controllers/stockController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/buy').post(protect, buyStock);
router.route('/sell').post(protect, sellStock);
router.route('/portfolio').get(protect, getPortfolio);
router.route('/:id').get(protect, getOrderById);

export default router;
