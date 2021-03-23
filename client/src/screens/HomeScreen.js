import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Tabs, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Movers from '../components/stock/Movers';
import StockCarousel from '../components/stock/StockCarousel';

const HomeScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <div
        className="title"
        style={
          !userInfo
            ? {
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + '/images/backgroundCropped.jpg'
                })`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }
            : { display: 'none' }
        }
      >
        <div className="greeting">
          <h1>Buy &amp; sell stocks in minutes</h1>
          <h5>toTheMoon is the easiet place to buy and sell stocks.</h5>
        </div>
        {!userInfo && (
          <LinkContainer to="/register">
            <Button type="submit" className="register-button">
              Register Now
            </Button>
          </LinkContainer>
        )}
      </div>
      <div className="carousel-div">
        <StockCarousel />
      </div>
      <Container>
        <div>
          <i className="fas fa-chart-line"></i>
          <h2 className="inline"> Top Movers</h2>
        </div>
        <div className="movers">
          <Tabs defaultActiveKey="gainers">
            <Tab eventKey="gainers" title="Gainers">
              <Movers type="gainers" history={history} />
            </Tab>
            <Tab eventKey="losers" title="Losers">
              <Movers type="losers" history={history} />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;
