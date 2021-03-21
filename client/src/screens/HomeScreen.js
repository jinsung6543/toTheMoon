import React from 'react';
import Search from '../components/Search';
import Movers from '../components/stock/Movers';

const HomeScreen = () => {
  return (
    <div>
      <div>
        <h1>Buy &amp; sell stocks in minutes</h1>
        toTheMoon is the easiet place to buy and sell stocks.
      </div>
      <div>
        <h2>Top Movers</h2>
        <Movers type="most active" />
        {/* <Movers type="gainers" />
        <Movers type="losers" /> */}
      </div>
    </div>
  );
};

export default HomeScreen;
