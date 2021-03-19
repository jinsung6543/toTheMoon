import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getPortfolio } from '../redux/actions/stockActions';

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const stockPortfolio = useSelector((state) => state.stockPortfolio);
  const { loading, error, portfolio } = stockPortfolio;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  return (
    <>
      <h1>Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.symbol}</td>
                <td>{stock.price}</td>
                <td>{stock.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default DashboardScreen;
