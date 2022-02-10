import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { style } from 'rh-date-picker/dist/style';
import store from './store';
import Header from './components/header';
import Home from './pages/home' 
import Error from './pages/error'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0 auto;
    padding: 0;
  }
  html {
    text-align: center;
    color: ${ style.page.color };
    background-color: ${ style.page.bgColor };
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
