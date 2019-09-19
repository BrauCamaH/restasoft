import React from 'react';
import MainLayout from './/lacomponentsyouts/MainLayout';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout></MainLayout>
    </ThemeProvider>
  );
}

export default App;
