import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/theme';
import GlobalState from './context/GlobalState';

import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';

import { SnackbarProvider } from 'notistack';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <GlobalState>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          preventDuplicate
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </GlobalState>
  );
}

export default App;
