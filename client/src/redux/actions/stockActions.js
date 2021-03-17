import iex from '../../apis/iex';
import {
  STOCK_DETAILS_FAIL,
  STOCK_DETAILS_REQUEST,
  STOCK_DETAILS_SUCCESS,
  STOCK_GAINERS_FAIL,
  STOCK_GAINERS_REQUEST,
  STOCK_GAINERS_SUCCESS,
  STOCK_LOSERS_FAIL,
  STOCK_LOSERS_REQUEST,
  STOCK_LOSERS_SUCCESS,
  STOCK_NEWS_FAIL,
  STOCK_NEWS_REQUEST,
  STOCK_NEWS_SUCCESS,
} from '../constants/stockConstants';

export const getGainers = () => async (dispatch) => {
  dispatch({
    type: STOCK_GAINERS_REQUEST,
  });

  try {
    const { data } = await iex.get(
      `/market/list/gainers?token=${process.env.REACT_APP_IEX_API_TOKEN}`
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
      `/market/list/losers?token=${process.env.REACT_APP_IEX_API_TOKEN}`
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
      `/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_TOKEN}`
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
      `/${symbol}/news?token=${process.env.REACT_APP_IEX_API_TOKEN}`
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
