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
