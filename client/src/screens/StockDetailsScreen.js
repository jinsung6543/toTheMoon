import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Button, Table } from 'react-bootstrap';
import News from '../components/stock/News';
import Order from '../components/stock/Order';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  getStockDetails,
  getStockChartData,
} from '../redux/actions/stockActions';
import StockChart from '../components/stock/StockChart';

const StockDetailsScreen = ({ match }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  const symbol = match.params.symbol;

  const dispatch = useDispatch();

  const stockDetails = useSelector((state) => state.stockDetails);
  const { loading, error, stock } = stockDetails;

  const stockChartData = useSelector((state) => state.stockChartData);
  const {
    loading: loadingChart,
    error: errorChart,
    chartData,
  } = stockChartData;

  useEffect(() => {
    setWidth(ref.current.offsetWidth);

    const handleResize = () => {
      setWidth(ref.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    dispatch(getStockDetails(symbol));
    dispatch(getStockChartData(symbol));

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, symbol]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Stock not found</Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{stock.companyName}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h1>${stock.latestPrice && stock.latestPrice.toFixed(2)}</h1>
                  <span className={stock.change > 0 ? 'green' : 'red'}>
                    ${stock.change}(
                    {stock.changePercent &&
                      (stock.changePercent * 100).toFixed(2)}
                    %)
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6} ref={ref}>
              {loadingChart ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">Error loading chart</Message>
              ) : (
                chartData && (
                  <StockChart
                    chartData={chartData}
                    width={width}
                    symbol={symbol}
                  />
                )
              )}
            </Col>
            <Col md={3}>
              <Order symbol={symbol.toUpperCase()} price={stock.latestPrice} />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Summary</h2>
              <Row>
                <Col>
                  <Row>
                    <Col>Previous Close:</Col>
                    <Col>{stock.previousClose}</Col>
                  </Row>
                  <Row>
                    <Col>Open:</Col>
                    <Col>{stock.open}</Col>
                  </Row>
                  <Row>
                    <Col>Day's Range:</Col>
                    <Col>
                      {stock.low} - {stock.high}
                    </Col>
                  </Row>
                  <Row>
                    <Col>52 Week Range:</Col>
                    <Col>
                      {stock.week52Low} - {stock.week52High}
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>Volume:</Col>
                    <Col>{stock.volume}</Col>
                  </Row>
                  <Row>
                    <Col>Market Cap:</Col>
                    <Col>${stock.marketCap}</Col>
                  </Row>
                  <Row>
                    <Col>peRatio:</Col>
                    <Col>{stock.peRatio ? stock.peRation : 'N/A'}</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <h2>News</h2>
              <News symbol={symbol} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default StockDetailsScreen;
