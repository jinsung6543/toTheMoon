import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Tabs, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Search from '../components/Search';
import Movers from '../components/stock/Movers';
import StockCarousel from '../components/stock/StockCarousel';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <div
        className="title"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + '/images/backgroundCropped.jpg'
          })`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <h1>Buy &amp; sell stocks in minutes</h1>
        <h5>toTheMoon is the easiet place to buy and sell stocks.</h5>
        {!userInfo && (
          <LinkContainer to="/register">
            <Button type="submit" className="register-button">
              Register Now
            </Button>
          </LinkContainer>
        )}
        <StockCarousel />
      </div>
      <Container>
        <div>
          <i class="fas fa-chart-line"></i>
          <h2 className="inline"> Top Movers</h2>
        </div>
        <div className="movers">
          <Tabs defaultActiveKey="gainers">
            <Tab eventKey="gainers" title="Gainers">
              <Movers type="gainers" />
            </Tab>
            <Tab eventKey="losers" title="Losers">
              <Movers type="losers" />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;
