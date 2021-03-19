import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Stock from '../models/stockModel.js';
import User from '../models/userModel.js';

// @desc  Create buy order
// @route POST /api/stocks/buy
// @access Private
export const buyStock = asyncHandler(async (req, res) => {
  const { symbol, price, quantity } = req.body;
  const user = await User.findById(req.user._id);

  if (user.cash < price * quantity || (symbol && quantity === 0)) {
    res.status(400);
    throw new Error('Invalid quantity');
  } else {
    let avgPrice, totalQuantity, existingStock;
    existingStock = await Stock.findOne({ symbol });

    if (existingStock) {
      const total = existingStock.quantity + quantity;
      avgPrice =
        existingStock.price * (existingStock.quantity / total) +
        price * (quantity / total);
      totalQuantity = existingStock.quantity + quantity;
      await existingStock.remove();
    } else {
      avgPrice = price;
      totalQuantity = quantity;
    }

    const stock = new Stock({
      user: req.user._id,
      symbol,
      price: avgPrice,
      quantity: totalQuantity,
    });

    const order = new Order({
      user: req.user._id,
      symbol,
      price,
      quantity,
      buyOrSell: 'buy',
    });

    user.cash -= price * quantity;
    await user.save();

    await stock.save();
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc  Create sell order
// @route POST /api/stocks/sell
// @access Private
export const sellStock = asyncHandler(async (req, res) => {
  const { symbol, price, quantity } = req.body;
  const user = await User.findById(req.user._id);

  let totalQuantity, existingStock;
  existingStock = await Stock.findOne({ symbol });

  if (!existingStock || quantity > existingStock.quantity) {
    res.status(400);
    throw new Error('Invalid quantity');
  } else {
    if (symbol && quantity === 0) {
      res.status(400);
      throw new Error('Must set quantity');
    } else {
      totalQuantity = existingStock.quantity - quantity;
      await existingStock.remove();

      const stock = new Stock({
        user: req.user._id,
        symbol,
        price: existingStock.price,
        quantity: totalQuantity,
      });

      const order = new Order({
        user: req.user._id,
        symbol,
        price,
        quantity,
        buyOrSell: 'sell',
      });

      user.cash += price * quantity;
      await user.save();

      if (existingStock.quantity > quantity) {
        await stock.save();
      }
      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  }
});

// @desc  Get stock by symbol
// @route GET /api/stocks/:symbol
// @access Private
export const getStockBySymbol = asyncHandler(async (req, res) => {
  const { symbol } = req.params;
  const stock = await Stock.findOne({ symbol });

  if (stock) {
    res.json(stock);
  } else {
    res.json({
      message: 'Stock not found',
    });
  }
});

// @desc  Get order by ID
// @route GET /api/stocks/:id
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
// @route GET /api/stocks/portfolio
// @access Private
export const getPortfolio = asyncHandler(async (req, res) => {
  const stocks = await Stock.find({ user: req.user._id });
  res.json(stocks);
});
