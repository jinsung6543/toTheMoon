import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Container } from 'react-bootstrap';
import News from '../components/stock/News';
import Order from '../components/stock/Order';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  getStockDetails,
  getStockChartData,
} from '../redux/actions/stockActions';
import StockChart from '../components/stock/StockChart';
import StockDetails from '../components/stock/StockDetails';

const StockDetailsScreen = ({ match }) => {
  const refWidth = useRef(null);
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
    setWidth(refWidth.current.offsetWidth - 30);

    const handleResize = () => {
      setWidth(refWidth.current.offsetWidth - 30);
    };

    window.addEventListener('resize', handleResize);
    dispatch(getStockDetails(symbol));
    dispatch(getStockChartData(symbol));

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, symbol]);

  return (
    <div className="stock-details-screen">
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">Stock not found</Message>
        ) : (
          <>
            <Row>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item className="border-top-radius stock-details-title">
                    <h3>{stock.companyName}</h3>
                    {stock.primaryExchange && stock.primaryExchange}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h1 className="inline">
                      ${stock.latestPrice && stock.latestPrice.toFixed(2)}
                    </h1>
                    <span className={stock.change > 0 ? 'green' : 'red'}>
                      {' '}
                      {stock.change}(
                      {stock.changePercent &&
                        (stock.changePercent * 100).toFixed(2)}
                      %)
                    </span>
                    {stock.extendedPrice && (
                      <div>
                        Extended Hours:{' '}
                        <span
                          className={stock.extendedChange > 0 ? 'green' : 'red'}
                        >
                          ${stock.extendedPrice}(
                          {stock.extendedChangePercent &&
                            (stock.extendedChangePercent * 100).toFixed(2)}
                          %)
                        </span>
                      </div>
                    )}
                  </ListGroup.Item>
                  <Order
                    symbol={symbol.toUpperCase()}
                    price={stock.latestPrice}
                  />
                </ListGroup>
              </Col>
              <Col ref={refWidth} lg={8} md={12}>
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
            </Row>

            <Row>
              <Col>
                <StockDetails stock={stock} />
              </Col>
            </Row>

            <Row>
              <Col>
                <News symbol={symbol} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default StockDetailsScreen;
