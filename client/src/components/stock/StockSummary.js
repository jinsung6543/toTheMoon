import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import iex from '../../apis/iex';

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
      <td>${parseFloat(stock.price.toFixed(2)).toLocaleString()}</td>
      <td>${currentPrice.toLocaleString()}</td>
      <td>{stock.quantity.toLocaleString()}</td>
      <td>
        $
        {parseFloat((stock.quantity * stock.price).toFixed(2)).toLocaleString()}
      </td>
      <td
        className={
          stock.price - currentPrice.toFixed(2) < 0.01
            ? 'black'
            : stock.price < currentPrice
            ? 'green'
            : 'red'
        }
      >
        ${(stock.price - currentPrice).toFixed(2)}
      </td>
      <td
        className={
          stock.price - currentPrice.toFixed(2) < 0.01
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
