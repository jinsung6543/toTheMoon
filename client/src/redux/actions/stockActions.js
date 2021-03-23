import axios from 'axios';
import iex from '../../apis/iex';
import {
  STOCK_BUY_FAIL,
  STOCK_BUY_REQUEST,
  STOCK_BUY_SUCCESS,
  STOCK_CHART_DATA_FAIL,
  STOCK_CHART_DATA_REQUEST,
  STOCK_CHART_DATA_SUCCESS,
  STOCK_DETAILS_FAIL,
  STOCK_DETAILS_REQUEST,
  STOCK_DETAILS_SUCCESS,
  STOCK_GAINERS_FAIL,
  STOCK_GAINERS_REQUEST,
  STOCK_GAINERS_SUCCESS,
  STOCK_HOLDING_FAIL,
  STOCK_HOLDING_REQUEST,
  STOCK_HOLDING_SUCCESS,
  STOCK_LOSERS_FAIL,
  STOCK_LOSERS_REQUEST,
  STOCK_LOSERS_SUCCESS,
  STOCK_MOST_ACTIVE_FAIL,
  STOCK_MOST_ACTIVE_REQUEST,
  STOCK_MOST_ACTIVE_SUCCESS,
  STOCK_NEWS_FAIL,
  STOCK_NEWS_REQUEST,
  STOCK_NEWS_SUCCESS,
  STOCK_ORDER_LIST_FAIL,
  STOCK_ORDER_LIST_REQUEST,
  STOCK_ORDER_LIST_SUCCESS,
  STOCK_PORTFOLIO_FAIL,
  STOCK_PORTFOLIO_REQUEST,
  STOCK_PORTFOLIO_SUCCESS,
  STOCK_SELL_FAIL,
  STOCK_SELL_REQUEST,
  STOCK_SELL_SUCCESS,
} from '../constants/stockConstants';

export const getMostActive = () => async (dispatch) => {
  dispatch({
    type: STOCK_MOST_ACTIVE_REQUEST,
  });

  try {
    const { data } = await iex.get(
      `/market/list/mostactive?token=${process.env.REACT_APP_IEX_API_TOKEN2}`
    );

    dispatch({
      type: STOCK_MOST_ACTIVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_MOST_ACTIVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getGainers = () => async (dispatch) => {
  dispatch({
    type: STOCK_GAINERS_REQUEST,
  });

  try {
    const { data } = await iex.get(
      `/market/list/gainers?token=${process.env.REACT_APP_IEX_API_TOKEN2}`
    );

    dispatch({
      type: STOCK_GAINERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_GAINERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getLosers = () => async (dispatch) => {
  dispatch({
    type: STOCK_LOSERS_REQUEST,
  });

  try {
    const { data } = await iex.get(
      `/market/list/losers?token=${process.env.REACT_APP_IEX_API_TOKEN2}`
    );

    dispatch({
      type: STOCK_LOSERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_LOSERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStockDetails = (symbol) => async (dispatch) => {
  dispatch({
    type: STOCK_DETAILS_REQUEST,
  });

  try {
    const { data } = await iex.get(
      `/${symbol.toUpperCase()}/quote?token=${
        process.env.REACT_APP_IEX_API_TOKEN2
      }`
    );

    dispatch({
      type: STOCK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNews = (symbol) => async (dispatch) => {
  dispatch({
    type: STOCK_NEWS_REQUEST,
  });

  try {
    const { data } = await iex.get(
      `/${symbol}/news?token=${process.env.REACT_APP_IEX_API_TOKEN2}`
    );

    dispatch({
      type: STOCK_NEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_NEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStockHolding = (symbol) => async (dispatch, getState) => {
  dispatch({
    type: STOCK_HOLDING_REQUEST,
  });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/stocks/${symbol}`, config);

    dispatch({
      type: STOCK_HOLDING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_HOLDING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const buyStock = (stock) => async (dispatch, getState) => {
  const { symbol, price, quantity } = stock;

  dispatch({
    type: STOCK_BUY_REQUEST,
  });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/stocks/buy`,
      { symbol, price: price.toFixed(2), quantity },
      config
    );

    dispatch({
      type: STOCK_BUY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_BUY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sellStock = (stock) => async (dispatch, getState) => {
  const { symbol, price, closedPrice, quantity } = stock;

  dispatch({
    type: STOCK_SELL_REQUEST,
  });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/stocks/sell`,
      {
        symbol,
        price: price.toFixed(2),
        closedPrice: closedPrice.toFixed(2),
        quantity,
      },
      config
    );

    dispatch({
      type: STOCK_SELL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_SELL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPortfolio = () => async (dispatch, getState) => {
  dispatch({
    type: STOCK_PORTFOLIO_REQUEST,
  });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/stocks/portfolio`, config);

    dispatch({
      type: STOCK_PORTFOLIO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_PORTFOLIO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  dispatch({
    type: STOCK_ORDER_LIST_REQUEST,
  });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/stocks/orders`, config);

    dispatch({
      type: STOCK_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getStockChartData = (symbol) => async (dispatch) => {
  dispatch({
    type: STOCK_CHART_DATA_REQUEST,
  });

  try {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_TOKEN}`
    );

    dispatch({
      type: STOCK_CHART_DATA_SUCCESS,
      payload: data['Time Series (Daily)'],
    });
  } catch (error) {
    dispatch({
      type: STOCK_CHART_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
