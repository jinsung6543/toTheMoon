import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatLargeDollar, formatDollar } from '../../utils/number';

const StockDetails = ({ stock }) => {
  return (
    <>
      <i className="fas fa-file-alt"></i>
      <h2 className="inline stock-details-heading"> Details</h2>
      <Row>
        <Col>
          <Row>
            <Col>Previous Close:</Col>
            <Col>
              {stock.previousClose && formatDollar(stock.previousClose)}
            </Col>
          </Row>
          <Row>
            <Col>Open:</Col>
            <Col>{stock.open ? formatDollar(stock.open) : 'N/A'}</Col>
          </Row>
          <Row>
            <Col>Day Low:</Col>
            <Col>{stock.low ? formatDollar(stock.low) : 'N/A'}</Col>
          </Row>
          <Row>
            <Col>Day High:</Col>
            <Col>{stock.high ? formatDollar(stock.high) : 'N/A'}</Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>52 Week Low:</Col>
            <Col>{stock.week52Low && formatDollar(stock.week52Low)}</Col>
          </Row>
          <Row>
            <Col>52 Week High:</Col>
            <Col>{stock.week52High && formatDollar(stock.week52High)}</Col>
          </Row>
          <Row>
            <Col>Volume:</Col>
            <Col>
              {stock.volume
                ? stock.volume && stock.volume.toLocaleString()
                : 'N/A'}
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
