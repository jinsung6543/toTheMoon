import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  FormControl,
  Button,
  Card,
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

const Order = ({ symbol, price }) => {
  const [quantity, setQuantity] = useState(0);
  const [transactionMessage, setTransactionMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: loadingU, error: errorU, user } = userProfile;

  const stockHolding = useSelector((state) => state.stockHolding);
  const { loading: loadingS, error: errorS, stock } = stockHolding;

  const stockBuy = useSelector((state) => state.stockBuy);
  const { success: successBuy, error: errorBuy } = stockBuy;

  const stockSell = useSelector((state) => state.stockSell);
  const { success: successSell, error: errorSell } = stockSell;

  useEffect(() => {
    if (!userInfo) {
    } else {
      dispatch(getUserProfile('profile'));
      dispatch(getStockHolding(symbol));
    }
  }, [dispatch, userInfo, symbol, successBuy, successSell]);

  const buyHandler = (e) => {
    dispatch(buyStock({ symbol, price, quantity }));
    setQuantity(0);
    quantity <= 0
      ? renderTransactionMessage('You must enter quantity')
      : user.cash < price * quantity
      ? renderTransactionMessage('You have insufficient cash')
      : renderTransactionMessage(
          `Order filled. Buy ${quantity} @ $${price.toFixed(2)}`
        );
  };

  const sellHandler = (e) => {
    const profitOrLoss = stock.price - price;
    dispatch(sellStock({ symbol, price, quantity, profitOrLoss }));
    setQuantity(0);
    quantity <= 0
      ? renderTransactionMessage('You must enter quantity')
      : stock.quantity < quantity
      ? renderTransactionMessage('You have insufficient stocks to sell')
      : renderTransactionMessage(
          `Order filled. Sell ${quantity} @ $${price.toFixed(2)}`
        );
  };

  const renderTransactionMessage = (message) => {
    setTransactionMessage(message);
    setTimeout(() => setTransactionMessage(0), 3000);
  };

  return (
    <>
      <ListGroup.Item>
        Cash: $
        {user && user.cash && parseFloat(user.cash.toFixed(2)).toLocaleString()}
      </ListGroup.Item>

      <ListGroup.Item>
        Owned:{' '}
        {stock &&
          (stock.message ? (
            0
          ) : (
            <span>
              {stock.quantity && stock.quantity.toLocaleString()} @ $
              {stock.price &&
                parseFloat(stock.price.toFixed(2)).toLocaleString()}
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
          <Message className="transaction-message">
            {transactionMessage}
          </Message>
        ) : (
          ''
        )}
      </ListGroup.Item>
    </>
  );
};

export default Order;
