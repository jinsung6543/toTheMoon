import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';
import { getMostActive } from '../../redux/actions/stockActions';

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
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover">
      {stocks.map((stock) => (
        <Carousel.Item key={stock.symbol}>
          <Link to={`/stock/${stock.symbol}`}>
            <Carousel.Caption className="carousel-caption">
              <div>
                <h2 className="inline">{stock.symbol}</h2>
                <span> ({stock.companyName}) </span>
                <span className={stock.changePercent > 0 ? 'green' : 'red'}>
                  {' '}
                  {(stock.changePercent * 100).toFixed(2)}%
                </span>
              </div>
              <h4>${stock.latestPrice.toFixed(2)}</h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default StockCarousel;
