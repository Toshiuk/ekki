import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Alert from 'react-s-alert';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Routes from './routes';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes />
        <Footer />
      </BrowserRouter>
      <Alert stack={{ limit: 3 }} />
    </div>
  );
}

export default App;
