import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import iex from '../../apis/iex';

const StockSummary = ({ stock }) => {
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    async function getCurrentPrice() {
      const { data } = await iex.get(
        `/${stock.symbol}/quote?token=${process.env.REACT_APP_IEX_API_TOKEN}`
      );
      setCurrentPrice(data.latestPrice);
    }
    getCurrentPrice();
    return () => setCurrentPrice(0);
  }, [stock]);

  return (
    <tr>
      <td>
        <Link to={`/quote/${stock.symbol}`}>{stock.symbol}</Link>
      </td>
      <td>${stock.price}</td>
      <td>${currentPrice}</td>
      <td>{stock.quantity}</td>
      <td>${(stock.quantity * stock.price).toFixed(2)}</td>
      <td
        className={
          stock.price === currentPrice
            ? 'black'
            : stock.price > currentPrice
            ? 'green'
            : 'red'
        }
      >
        {((currentPrice - stock.price) / stock.price) * 100}%
      </td>
    </tr>
  );
};

export default StockSummary;
