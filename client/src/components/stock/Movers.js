import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import { getGainers, getLosers } from '../../redux/actions/stockActions';

const Movers = ({ type }) => {
  const dispatch = useDispatch();

  const stockMovers = useSelector((state) =>
    type === 'gainers' ? state.stockGainers : state.stockLosers
  );
  const { loading, error, stocks } = stockMovers;

  useEffect(() => {
    type === 'gainers' ? dispatch(getGainers()) : dispatch(getLosers());
  }, [dispatch, type]);

  return (
    <>
      {type === 'gainers' ? <h3>Gainers</h3> : <h3>Losers</h3>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>% Change</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks &&
              stocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td>
                    <Link to={`/quote/${stock.symbol}`}>{stock.symbol}</Link>
                  </td>
                  <td>{stock.companyName}</td>
                  <td className={stock.change > 0 ? 'green' : 'red'}>
                    {(stock.changePercent * 100).toFixed(2)}%
                  </td>
                  <td>${stock.latestPrice}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Movers;
