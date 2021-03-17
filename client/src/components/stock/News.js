import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Row, Col, Image } from 'react-bootstrap';
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ListGroup>
          {news.map((n) => (
            <Row key={n.url}>
              <Col md={3}>
                <Image src={n.image} alt={n.headline} fluid />
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {moment(n.datetime).format('YYYY-MM-DD')}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <a href={n.url} target="_blank" rel="noreferrer noopener">
                      <h4>{n.headline}</h4>
                    </a>
                  </ListGroup.Item>

                  <ListGroup.Item>{n.summary}</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default News;
