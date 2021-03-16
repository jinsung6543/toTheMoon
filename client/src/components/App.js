import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={HomeScreen} exact />
      </BrowserRouter>
    </div>
  );
}

export default App;
