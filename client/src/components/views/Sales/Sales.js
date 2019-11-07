import React, { useState, useEffect, createContext } from 'react';
import { Grid } from '@material-ui/core';
import { SaleCard, SalesToolbar } from './components';
import { makeStyles } from '@material-ui/core/styles';

//import axios from 'axios';
import useAxios from 'axios-hooks';

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
}));

const Sales = () => {
  const classes = useStyles();

  const [{ data, loanding, error }, refetch] = useAxios('/api/sales');
  if (error) {
    console.log(error);
  }

  const [sales, setSales] = useState([]);

  const addSale = sale => {};
  const deleteSale = sale => {};
  const editSale = sale => {};

  return (
    <SalesContext.Provider
      value={{
        isLoanding: loanding,
        sales: sales,
        addSale: addSale,
        deleteSale: deleteSale,
        editSale: editSale,
        setSales: setSales,
      }}>
      <div className={classes.root}>
        <SalesToolbar></SalesToolbar>
        <div className={classes.content}>
          <Grid>
            {sales.map(sale => (
              <Grid item key={sale.id} lg={4} md={6} xs={12}>
                <SaleCard></SaleCard>
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
