import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/theme';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';


const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </ThemeProvider>
  );
}

export default App;
