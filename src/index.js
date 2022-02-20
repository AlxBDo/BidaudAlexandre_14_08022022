import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import { Provider } from 'react-redux';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { createGlobalStyle } from 'styled-components';

import { style, theme } from 'rh-date-picker/dist/style';
import { styleDef } from "./style"
import store from './store';
import Header from './components/header';
import Home from './pages/home' 
import Error from './pages/error'
import Employees from './pages/employees';
 
 
const getMuiTheme = () => createTheme({
  theme,
  palette: {
    primary: {
      main: style.page.color,
    },
    background: {
      default: style.backgroundColor(),
    },
  },
})

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0 auto;
    padding: 0;
  };
  a { color: ${ style.page.color }; }
  body {
    text-align: center;
    color: ${ style.page.color };
    background-color: ${ style.backgroundColor() };
  };
  div.ReactModalPortal p {
      margin: 10px auto;
      &:last-of-type {
          font-size: smaller;
          padding: ${styleDef.padding}
      }
  };
  div.css-ghsjzk-MuiInputBase-root-MuiInput-root, label.MuiInputLabel-root {
      color: ${ style.color() };
  }
  div.MuiPaper-root {
    &:first-child { margin-bottom: 25px; }
    fieldset {
      background-color: ${ style.backgroundColor() }; 
      padding: 20px;
      span { 
        color: ${ style.color() };
      }
    }
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
        <ThemeProvider theme={ getMuiTheme() }>
          <Router>
            <GlobalStyle />
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/employees" element={<Employees />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
