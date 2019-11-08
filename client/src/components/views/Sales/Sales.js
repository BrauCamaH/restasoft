import React, { useState, useEffect, createContext, useContext } from 'react';
import { Grid } from '@material-ui/core';
import { SaleCard, SalesToolbar } from './components';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import axios from 'axios';
import userContext from '../../../context/user-context';

const SalesContext = createContext({
  isLoanding: false,
  sales: [],
  addSale: sale => {},
  deleteSale: sale => {},
  editSale: sale => {},
  setSales: sales => {},
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const Sales = () => {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const context = useContext(userContext);

  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/sales`)
      .then(res => {
        setSales(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  const addSale = sale => {
    //console.log('Adding Sale ', sale);
    const { client, table } = sale;

    axios
      .post(`/api/sales`, {
        user: context.userId,
        client: client,
        table: table,
        total: 0,
      })
      .then(res => {
        //console.log(res.data);
        const updatedSales = [...sales];
        updatedSales.push(res.data);
        setSales(updatedSales);

        enqueueSnackbar('Sale Added', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deleteSale = sale => {};
  const editSale = sale => {};

  return (
    <SalesContext.Provider
      value={{
        isLoanding: isLoading,
        sales: sales,
        addSale: addSale,
        deleteSale: deleteSale,
        editSale: editSale,
        setSales: setSales,
      }}>
      <div className={classes.root}>
        <SalesToolbar></SalesToolbar>
        <div className={classes.content}>
          <Grid container spacing={3}>
            {sales.map(sale => (
              <Grid item key={sale.id} lg={4} md={6} xs={12}>
                <SaleCard sale={sale}></SaleCard>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </SalesContext.Provider>
  );
};

export { SalesContext };
export default Sales;
