import React, { useEffect, useState } from 'react';
import iex from '../../apis/iex';
import { formatDollar } from '../../utils/number';

const StockSummary = ({ stock, history }) => {
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const getCurrentPrice = async () => {
      try {
        const { data } = await iex.get(
          `/${stock.symbol}/quote?token=${process.env.REACT_APP_IEX_API_TOKEN2}`
        );
        setCurrentPrice(data.latestPrice);
      } catch (e) {
        setCurrentPrice(null);
      }
    };
    getCurrentPrice();
    return () => setCurrentPrice(0);
  }, [stock]);

  const rowClickHandler = (symbol) => {
    history.push(`/quote/${symbol.toUpperCase()}`);
  };

  return (
    <tr onClick={() => rowClickHandler(stock.symbol)} className="stock-row">
      <td>{stock.symbol}</td>
      <td>{stock.price && formatDollar(stock.price)}</td>
      <td>{currentPrice && formatDollar(currentPrice)}</td>
      <td>{stock.quantity.toLocaleString()}</td>
      <td>{formatDollar(stock.quantity * stock.price)}</td>
      <td
        className={
          currentPrice - stock.price <= 0.004
            ? 'black'
            : currentPrice > stock.price
            ? 'green'
            : 'red'
        }
      >
        {currentPrice &&
          formatDollar((currentPrice - stock.price) * stock.quantity)}
      </td>
      <td
        className={
          currentPrice && currentPrice - stock.price <= 0.004
            ? 'black'
            : currentPrice > stock.price
            ? 'green'
            : 'red'
        }
      >
        {(
          ((currentPrice && currentPrice - stock.price) / stock.price) *
          100
        ).toFixed(2)}
        %
      </td>
    </tr>
  );
};

export default StockSummary;
