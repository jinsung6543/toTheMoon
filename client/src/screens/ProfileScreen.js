import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getUserProfile,
  updateUserProfile,
} from '../redux/actions/userActions';
import { getOrderList } from '../redux/actions/stockActions';
import { USER_PROFILE_UPDATE_RESET } from '../redux/constants/userConstants';
import { formatDollar } from '../utils/number';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const stockOrderList = useSelector((state) => state.stockOrderList);
  const { loading: loadingOrders, error: errorOrders, orders } = stockOrderList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_PROFILE_UPDATE_RESET });
        dispatch(getUserProfile('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
        dispatch(getOrderList());
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <div>
            <i className="fas fa-address-card"></i>
            <h2 className="inline"> User Profile</h2>
          </div>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler} className="profile">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <div>
            <i className="fas fa-money-bill-wave"></i>
            <h2 className="inline"> My Orders</h2>
          </div>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Avg Price</th>
                  <th>Closed Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                  <th>Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <Link to={`/quote/${order.symbol}`}>{order.symbol}</Link>
                    </td>
                    <td>
                      {order.price && formatDollar(parseFloat(order.price))}
                    </td>
                    <td>
                      {order.closedPrice
                        ? formatDollar(parseFloat(order.closedPrice))
                        : 'N/A'}
                    </td>
                    <td>{order.quantity && order.quantity.toLocaleString()}</td>
                    <td className={order.buyOrSell === 'buy' ? 'green' : 'red'}>
                      {order.buyOrSell.toUpperCase()}
                    </td>
                    {order.buyOrSell === 'buy' ? (
                      <td>N/A</td>
                    ) : (
                      <td
                        className={
                          (order.price - order.closedPrice) * order.quantity ===
                          0
                            ? 'black'
                            : order.closedPrice > order.price
                            ? 'green'
                            : 'red'
                        }
                      >
                        {formatDollar(
                          (order.closedPrice - order.price) * order.quantity
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
