import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import StockDetailsScreen from '../screens/StockDetailsScreen';
import RegisterScreen from '../screens/RegisterScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container fluid>
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/quote/:symbol" component={StockDetailsScreen} />
            <Route path="/" component={HomeScreen} exact />
          </Container>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
