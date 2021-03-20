import {
  STOCK_GAINERS_FAIL,
  STOCK_GAINERS_REQUEST,
  STOCK_GAINERS_SUCCESS,
  STOCK_LOSERS_REQUEST,
  STOCK_LOSERS_SUCCESS,
  STOCK_LOSERS_FAIL,
  STOCK_DETAILS_FAIL,
  STOCK_DETAILS_REQUEST,
  STOCK_DETAILS_SUCCESS,
  STOCK_NEWS_REQUEST,
  STOCK_NEWS_SUCCESS,
  STOCK_NEWS_FAIL,
  STOCK_HOLDING_REQUEST,
  STOCK_HOLDING_SUCCESS,
  STOCK_HOLDING_FAIL,
  STOCK_BUY_REQUEST,
  STOCK_BUY_SUCCESS,
  STOCK_BUY_FAIL,
  STOCK_SELL_REQUEST,
  STOCK_SELL_SUCCESS,
  STOCK_SELL_FAIL,
  STOCK_PORTFOLIO_REQUEST,
  STOCK_PORTFOLIO_SUCCESS,
  STOCK_PORTFOLIO_FAIL,
  STOCK_ORDER_LIST_REQUEST,
  STOCK_ORDER_LIST_SUCCESS,
  STOCK_ORDER_LIST_FAIL,
} from '../constants/stockConstants';

export const stockGainersReducer = (state = { stocks: [] }, action) => {
  switch (action.type) {
    case STOCK_GAINERS_REQUEST:
      return { loading: true };
    case STOCK_GAINERS_SUCCESS:
      return { loading: false, stocks: action.payload };
    case STOCK_GAINERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockLosersReducer = (state = { stocks: [] }, action) => {
  switch (action.type) {
    case STOCK_LOSERS_REQUEST:
      return { loading: true };
    case STOCK_LOSERS_SUCCESS:
      return { loading: false, stocks: action.payload };
    case STOCK_LOSERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockDetailsReducer = (state = { stock: {} }, action) => {
  switch (action.type) {
    case STOCK_DETAILS_REQUEST:
      return { loading: true };
    case STOCK_DETAILS_SUCCESS:
      return { loading: false, stock: action.payload };
    case STOCK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockNewsReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case STOCK_NEWS_REQUEST:
      return { loading: true };
    case STOCK_NEWS_SUCCESS:
      return { loading: false, news: action.payload };
    case STOCK_NEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockHoldingReducer = (state = { stock: {} }, action) => {
  switch (action.type) {
    case STOCK_HOLDING_REQUEST:
      return { loading: true };
    case STOCK_HOLDING_SUCCESS:
      return { loading: false, stock: action.payload };
    case STOCK_HOLDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockBuyReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_BUY_REQUEST:
      return { loading: true };
    case STOCK_BUY_SUCCESS:
      return { loading: false, success: true, stockBuy: action.payload };
    case STOCK_BUY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockSellReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_SELL_REQUEST:
      return { loading: true };
    case STOCK_SELL_SUCCESS:
      return { loading: false, success: true, stockSell: action.payload };
    case STOCK_SELL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockPortfolioReducer = (state = { portfolio: [] }, action) => {
  switch (action.type) {
    case STOCK_PORTFOLIO_REQUEST:
      return { loading: true };
    case STOCK_PORTFOLIO_SUCCESS:
      return { loading: false, portfolio: action.payload };
    case STOCK_PORTFOLIO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const stockOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case STOCK_ORDER_LIST_REQUEST:
      return { loading: true };
    case STOCK_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case STOCK_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
