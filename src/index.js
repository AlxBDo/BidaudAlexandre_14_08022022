import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import { Provider } from 'react-redux';
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { createGlobalStyle } from 'styled-components';

import { style } from 'rh-date-picker/dist/style';
import store from './store';
import Header from './components/header';
import Home from './pages/home' 
import Error from './pages/error'
import Employees from './pages/employees';


const getMuiTheme = () => createTheme({
  overrides: {
      MUIDataTableBodyCell: {
          root: {
              backgroundColor: "#FF0000"
          }
      }
  }
})

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
        <ThemeProvider theme={ getMuiTheme() }>
          <CssBaseline />
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
