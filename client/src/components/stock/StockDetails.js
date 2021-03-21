import React from 'react';
import { Row, Col, ListGroup, Card, Button, Table } from 'react-bootstrap';
import { formatLargeDollar } from '../../utils/number';

const StockDetails = ({ stock }) => {
  return (
    <>
      <i class="fas fa-file-alt"></i>
      <h2 className="inline"> Details</h2>
      <Row>
        <Col>
          <Row>
            <Col>Previous Close:</Col>
            <Col>
              ${stock.previousClose && stock.previousClose.toLocaleString()}
            </Col>
          </Row>
          <Row>
            <Col>Open:</Col>
            <Col>${stock.open && stock.open.toLocaleString()}</Col>
          </Row>
          <Row>
            <Col>Day Low:</Col>
            <Col>${stock.low && stock.low.toLocaleString()}</Col>
          </Row>
          <Row>
            <Col>Day High:</Col>
            <Col>${stock.high && stock.high.toLocaleString()}</Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>52 Week Low:</Col>
            <Col>${stock.week52Low && stock.week52Low.toLocaleString()}</Col>
          </Row>
          <Row>
            <Col>52 Week High:</Col>
            <Col>${stock.week52Low && stock.week52Low.toLocaleString()}</Col>
          </Row>
          <Row>
            <Col>Volume:</Col>
            <Col>
              {stock.volume && stock.volume && stock.volume.toLocaleString()}
            </Col>
          </Row>
          <Row>
            <Col>Avg Volume:</Col>
            <Col>
              {stock.avgTotalVolume && stock.avgTotalVolume.toLocaleString()}
            </Col>
          </Row>
        </Col>

        <Col>
          <Row>
            <Col>Market Cap:</Col>
            <Col>${formatLargeDollar(stock.marketCap)}</Col>
          </Row>
          <Row>
            <Col>PE Ratio:</Col>
            <Col>{stock.peRatio ? stock.peRatio.toLocaleString() : 'N/A'}</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default StockDetails;
