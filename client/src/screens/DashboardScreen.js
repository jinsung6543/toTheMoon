import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import iex from '../apis/iex';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getPortfolio } from '../redux/actions/stockActions';
import { getUserProfile } from '../redux/actions/userActions';
import StockSummary from '../components/stock/StockSummary';

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const stockPortfolio = useSelector((state) => state.stockPortfolio);
  const { loading, error, portfolio } = stockPortfolio;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: loadingU, error: errorU, user } = userProfile;

  useEffect(() => {
    dispatch(getUserProfile('profile'));
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
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Total equity</th>
                <th>Cash</th>
                <th>Market value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  $
                  {(
                    portfolio.reduce(
                      (acc, cur) => acc + cur.price * cur.quantity,
                      0
                    ) + user.cash
                  ).toFixed(2)}
                </td>
                <td>${user.cash.toFixed(2)}</td>
                <td>
                  $
                  {portfolio
                    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                    .toFixed(2)}
                </td>
              </tr>
            </tbody>
          </Table>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Avg Price</th>
                <th>Current price</th>
                <th>Quantity</th>
                <th>Mkt value</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((stock) => (
                <StockSummary stock={stock} key={stock._id} />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default DashboardScreen;
