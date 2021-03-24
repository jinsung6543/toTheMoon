import React, { useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getPortfolio } from '../redux/actions/stockActions';
import { getUserProfile } from '../redux/actions/userActions';
import StockSummary from '../components/stock/StockSummary';
import { formatDollar } from '../utils/number';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const stockPortfolio = useSelector((state) => state.stockPortfolio);
  const { loading, error, portfolio } = stockPortfolio;

  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getUserProfile('profile'));
      dispatch(getPortfolio());
    }
  }, [dispatch, history, userInfo]);

  return (
    <Container>
      <div>
        <i className="fas fa-chart-bar"></i>
        <h1 className="inline"> Dashboard</h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table bordered hover responsive className="table-sm">
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
                  {user.cash &&
                    formatDollar(
                      portfolio.reduce(
                        (acc, cur) => acc + cur.price * cur.quantity,
                        0
                      ) + user.cash
                    )}
                </td>
                <td>{user.cash && formatDollar(user.cash)}</td>
                <td>
                  {formatDollar(
                    portfolio.reduce(
                      (acc, cur) => acc + cur.price * cur.quantity,
                      0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          {portfolio.length > 0 ? (
            <Table hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Avg Price</th>
                  <th>Current price</th>
                  <th>Quantity</th>
                  <th>Mkt value</th>
                  <th>Change</th>
                  <th>Change %</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock) => (
                  <StockSummary
                    stock={stock}
                    key={stock._id}
                    history={history}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <div>You don't have any stocks yet.</div>
          )}
        </>
      )}
    </Container>
  );
};

export default DashboardScreen;
