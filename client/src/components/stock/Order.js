import React, { useState } from 'react';
import {
  Row,
  Col,
  ListGroup,
  FormControl,
  Button,
  Card,
  InputGroup,
} from 'react-bootstrap';

const Order = ({ price }) => {
  const [quantity, setQuantity] = useState(0);

  const buyHandler = (e) => {
    console.log('buy', quantity);
  };

  const sellHandler = (e) => {
    console.log('sell', quantity);
  };

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col>Balance:</Col>
            <Col>$424234</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Quantity</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}
            ></FormControl>
          </InputGroup>
        </ListGroup.Item>

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
