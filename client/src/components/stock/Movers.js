import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import {
  getGainers,
  getLosers,
  getMostActive,
} from '../../redux/actions/stockActions';
import { formatDollar } from '../../utils/number';

const Movers = ({ type, history }) => {
  const dispatch = useDispatch();

  const stockMovers = useSelector((state) =>
    type === 'most active'
      ? state.stockMostActive
      : type === 'gainers'
      ? state.stockGainers
      : state.stockLosers
  );
  const { loading, error, stocks } = stockMovers;

  useEffect(() => {
    type === 'most active'
      ? dispatch(getMostActive())
      : type === 'gainers'
      ? dispatch(getGainers())
      : dispatch(getLosers());
  }, [dispatch, type]);

  const rowClickHandler = (symbol) => {
    history.push(`/quote/${symbol.toUpperCase()}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Volume</th>
              <th>% Change</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks &&
              stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  onClick={() => rowClickHandler(stock.symbol)}
                  className="stock-row"
                >
                  <td>{stock.symbol}</td>
                  <td>{stock.companyName}</td>
                  <td>
                    {stock.volume ? stock.volume.toLocaleString() : 'N/A'}
                  </td>
                  <td className={stock.change > 0 ? 'green' : 'red'}>
                    {(stock.changePercent * 100).toFixed(2)}%
                  </td>
                  <td>{formatDollar(stock.latestPrice)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Movers;
