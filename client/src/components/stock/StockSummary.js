import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import iex from '../../apis/iex';
import { formatDollar } from '../../utils/number';

const StockSummary = ({ stock }) => {
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    const getCurrentPrice = async () => {
      const { data } = await iex.get(
        `/${stock.symbol}/quote?token=${process.env.REACT_APP_IEX_API_TOKEN2}`
      );
      setCurrentPrice(data.latestPrice);
    };
    getCurrentPrice();
    return () => setCurrentPrice(0);
  }, [stock]);

  return (
    <tr>
      <td>
        <Link to={`/quote/${stock.symbol}`}>{stock.symbol}</Link>
      </td>
      <td>${stock.price.toLocaleString()}</td>
      <td>${currentPrice.toLocaleString()}</td>
      <td>{stock.quantity.toLocaleString()}</td>
      <td>${(stock.quantity * stock.price).toLocaleString()}</td>
      <td
        className={
          stock.price - currentPrice <= 0.004
            ? 'black'
            : stock.price < currentPrice
            ? 'green'
            : 'red'
        }
      >
        {formatDollar(stock.price - currentPrice)}
      </td>
      <td
        className={
          stock.price - currentPrice <= 0.004
            ? 'black'
            : stock.price < currentPrice
            ? 'green'
            : 'red'
        }
      >
        {(((currentPrice - stock.price) / stock.price) * 100).toFixed(2)}%
      </td>
    </tr>
  );
};

export default StockSummary;
