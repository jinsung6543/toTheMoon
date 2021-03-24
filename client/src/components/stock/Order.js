import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  FormControl,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import { getUserProfile } from '../../redux/actions/userActions';
import {
  getStockHolding,
  buyStock,
  sellStock,
} from '../../redux/actions/stockActions';
import { formatDollar } from '../../utils/number';

const Order = ({ symbol, price }) => {
  const [quantity, setQuantity] = useState(0);
  const [transactionMessage, setTransactionMessage] = useState(null);
  const [error, setError] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;

  const stockHolding = useSelector((state) => state.stockHolding);
  const { stock } = stockHolding;

  const stockBuy = useSelector((state) => state.stockBuy);
  const { success: successBuy } = stockBuy;

  const stockSell = useSelector((state) => state.stockSell);
  const { success: successSell } = stockSell;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile('profile'));
      dispatch(getStockHolding(symbol));
    }
  }, [dispatch, userInfo, symbol, successBuy, successSell]);

  const buyHandler = (e) => {
    setError(true);
    if (isNaN(quantity) || quantity <= 0) {
      renderTransactionMessage('You must enter valid quantity');
    } else if (user.cash < price * quantity) {
      renderTransactionMessage('You have insufficient cash');
    } else {
      setError(false);
      renderTransactionMessage(
        `Order filled. Buy ${quantity} @ $${price.toFixed(2)}`
      );
      dispatch(buyStock({ symbol, price, quantity }));
    }
    setQuantity(0);
  };

  const sellHandler = (e) => {
    setError(true);
    if (isNaN(quantity) || quantity <= 0) {
      renderTransactionMessage('You must enter valid quantity');
    } else if (stock.message || stock.quantity < quantity) {
      renderTransactionMessage('You have insufficient stocks to sell');
    } else {
      setError(false);
      renderTransactionMessage(
        `Order filled. Sell ${quantity} @ $${price.toFixed(2)}`
      );
      dispatch(
        sellStock({
          symbol,
          price: stock.price,
          closedPrice: price,
          quantity,
        })
      );
    }

    setQuantity(0);
  };

  const renderTransactionMessage = (message) => {
    setTransactionMessage(message);
    setTimeout(() => setTransactionMessage(0), 3000);
  };

  return (
    <>
      {userInfo ? (
        <>
          <ListGroup.Item>
            Cash: {user && user.cash && formatDollar(user.cash)}
          </ListGroup.Item>

          <ListGroup.Item>
            Owned:{' '}
            {stock &&
              (stock.message ? (
                0
              ) : (
                <span>
                  {stock.quantity && stock.quantity.toLocaleString()} @{' '}
                  {stock.price && formatDollar(stock.price)}
                </span>
              ))}
          </ListGroup.Item>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Quantity</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              placeholder="Enter quantity"
              value={quantity.toString()}
              required
              onChange={(e) => {
                setQuantity(
                  e.target.value ? parseInt(e.target.value) : e.target.value
                );
              }}
            ></FormControl>
          </InputGroup>

          <ListGroup.Item className="border-bottom-radius">
            <Row className="orderButtons">
              <Col className="orderButtons">
                <Button
                  className="btn-block"
                  variant="success"
                  type="submit"
                  onClick={buyHandler}
                >
                  Buy
                </Button>
              </Col>
              <Col className="orderButtons">
                <Button
                  className="btn-block"
                  variant="danger"
                  type="submit"
                  onClick={sellHandler}
                >
                  Sell
                </Button>
              </Col>
            </Row>
            {transactionMessage ? (
              <Message
                className="trasaction-message"
                variant={error ? 'danger' : 'success'}
              >
                {transactionMessage}
              </Message>
            ) : (
              ''
            )}
          </ListGroup.Item>
        </>
      ) : (
        <ListGroup.Item className="border-bottom-radius">
          <Link to="/login">Log in</Link> or{' '}
          <Link to="/register">register</Link> to trade
        </ListGroup.Item>
      )}
    </>
  );
};

export default Order;
