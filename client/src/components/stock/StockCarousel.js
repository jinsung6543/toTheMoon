import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';
import { getMostActive } from '../../redux/actions/stockActions';
import { formatDollar } from '../../utils/number';

const StockCarousel = () => {
  const dispatch = useDispatch();

  const stockMostActive = useSelector((state) => state.stockMostActive);
  const { loading, error, stocks } = stockMostActive;

  useEffect(() => {
    dispatch(getMostActive());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      Failed to connect to API. Please try again later.
    </Message>
  ) : (
    <Carousel pause="hover">
      {stocks.map((stock) => (
        <Carousel.Item key={stock.symbol}>
          <Link to={`/quote/${stock.symbol}`}>
            <Carousel.Caption>
              <div>
                <h2 className="inline">{stock.symbol}</h2>
                <span> ({stock.companyName}) </span>
                <span className={stock.changePercent > 0 ? 'green' : 'red'}>
                  {' '}
                  {(stock.changePercent * 100).toFixed(2)}%
                </span>
              </div>
              <h4>{formatDollar(stock.latestPrice)}</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default StockCarousel;
