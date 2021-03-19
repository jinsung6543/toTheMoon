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
import { getUserProfile } from '../../redux/actions/userActions';
import {
  getStockHolding,
  buyStock,
  sellStock,
} from '../../redux/actions/stockActions';

const Order = ({ symbol, price }) => {
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: loadingU, error: errorU, user } = userProfile;

  const stockHolding = useSelector((state) => state.stockHolding);
  const { loading: loadingS, error: errorS, stock } = stockHolding;

  const stockBuy = useSelector((state) => state.stockBuy);
  const { success: successBuy } = stockBuy;

  const stockSell = useSelector((state) => state.stockSell);
  const { success: successSell } = stockSell;

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
  };

  const sellHandler = (e) => {
    dispatch(sellStock({ symbol, price, quantity }));
    setQuantity(0);
  };

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          Cash: ${user && user.cash && user.cash.toFixed(2)}
        </ListGroup.Item>

        <ListGroup.Item>
          Owned:{' '}
          {stock &&
            (stock.message ? (
              0
            ) : (
              <span>
                {stock.quantity} @ ${stock.price}
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
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          ></FormControl>
        </InputGroup>

        <ListGroup.Item>
          <Row>
            <Col>
              <Button
                className="btn-block"
                variant="success"
                type="submit"
                onClick={buyHandler}
              >
                Buy
              </Button>
            </Col>
            <Col>
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
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Order;
