import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardColumns, Col } from 'react-bootstrap';
import moment from 'moment';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getNews } from '../../redux/actions/stockActions';

const News = ({ symbol }) => {
  const dispatch = useDispatch();

  const stockNews = useSelector((state) => state.stockNews);
  const { loading, error, news } = stockNews;

  useEffect(() => {
    dispatch(getNews(symbol));
  }, [dispatch, symbol]);

  return (
    <>
      <i class="fas fa-newspaper"></i>
      <h2 className="inline"> News</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : news.length > 0 ? (
        <CardColumns>
          {news.map((n) => (
            <a
              key={n.url}
              href={n.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Card>
                <Card.Img variant="top" src={n.image} />
                <Card.Body>
                  <Card.Title>{n.headline}</Card.Title>
                  <Card.Text>{n.summary}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {moment(n.datetime).format('YYYY-MM-DD')}
                  </small>
                </Card.Footer>
              </Card>
            </a>
          ))}
        </CardColumns>
      ) : (
        <div>
          <h4>No news to display</h4>
        </div>
      )}
    </>
  );
};

export default News;
