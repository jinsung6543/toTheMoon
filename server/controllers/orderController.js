import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc  Create new order
// @route POST /api/orders
// @access Private
export const addOrderStock = asyncHandler(async (req, res) => {
  const { symbol, price, quantity } = req.body;

  if (symbol && quantity === 0) {
    res.status(400);
    throw new Error('No order stocks');
    return;
  } else {
    const order = new Order({
      stock,
      user: req.user._id,
      price,
      quantity,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc  Get order by ID
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc  Get logged in user orders
// @route GET /api/orders/portfolio
// @access Private
export const getPortfolio = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});
