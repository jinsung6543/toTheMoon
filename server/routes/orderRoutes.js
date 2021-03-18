import express from 'express';
import {
  addOrderStock,
  getOrderById,
  getPortfolio,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderStock);
router.route('/portfolio').get(protect, getPortfolio);
router.route('/:id').get(protect, getOrderById);

export default router;
