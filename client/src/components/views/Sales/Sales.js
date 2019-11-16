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
  products: [],
  addSale: sale => {},
  deleteSale: id => {},
  editSale: sale => {},
  setSales: sales => {},
  getTotal: () => {
    return 0;
  },
});

const OrdersContext = createContext({
  orders: [],
  products: [],
  addOrder: (sale, orders) => {},
  deleteOrder: id => {},
  editOrder: order => {},
  getOrdersBySale: id => {
    return [];
  },
  getProductById: () => {
    return {};
  },
  getTotalBySale: id => {},
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
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/orders`)
      .then(res => {
        setOrders(res.data);
        // console.log(res.data);
        axios
          .get(`/api/sales`)
          .then(res => {
            setSales(res.data);
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/products`)
      .then(res => {
        setProducts(res.data);
        //console.log(res.data);
      })
      .catch(err => {
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
  const deleteSale = id => {
    //console.log(`Sale Deleted with id ${id}`);
    const updatedSales = [...sales];
    const updatedItemIndex = updatedSales.findIndex(item => item.id === id);

    updatedSales.splice(updatedItemIndex, 1);

    setSales(updatedSales);

    axios
      .delete(`api/sales/${id}`)
      .then(res => {
        enqueueSnackbar('Sale Eliminated', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const editSale = sale => {
    //console.log(`Sale Updated with id ${id}`, sale);
    const { id, client, table } = sale;

    const updatedSales = [...sales];
    const updatedItemIndex = updatedSales.findIndex(item => item.id === id);

    updatedSales[updatedItemIndex] = sale;

    setSales(updatedSales);

    axios
      .put(`api/sales/${id}`, {
        user: context.userId,
        client: client,
        table: table,
        total: 0,
      })
      .then(res => {
        enqueueSnackbar('Sale Eliminated', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getOrdersBySale = id => {
    return orders
      .filter(order => order.sale === id)
      .map(order => ({
        sale: order.sale,
        product: products.find(product => product.id === order.product),
        price: order.price,
        quantity: order.quantity,
      }));
  };

  const getProductById = id => {
    return products.find(product => product.id === id);
  };

  //const setOrdersBySale = (sale, orders) => {};
  const addOrder = (sale, order) => {
    const { product, quantity } = order;

    const { price } = getProductById(product);

    axios
      .post(`/api/orders`, {
        price: price,
        quantity: quantity,
        sale: sale.id,
        product: product,
      })
      .then(res => {
        //console.log(res.data);
        const updatedOrders = [...orders];
        updatedOrders.push(res.data);

        setOrders(updatedOrders);
      })
      .catch(err => {
        //console.log(err);
        enqueueSnackbar('The order already exist', {
          variant: 'error',
        });
        setTimeout(closeSnackbar, 2000);
      });
  };
  const deleteOrder = id => {
    //alert(`order deleted with id ${id}`);
    axios
      .delete(`/api/orders/${id}`)
      .then(res => {
        //console.log(res.data);
        const updatedOrders = [...orders];
        const updatedItemIndex = updatedOrders.findIndex(
          item => item.id === id
        );

        updatedOrders.splice(updatedItemIndex, 1);

        setOrders(updatedOrders);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const editOrder = order => {
    //console.log(`order edited`, order);
    const { id, price, quantity, sale, product } = order;
    const updatedOrders = [...orders];
    const updatedItemIndex = updatedOrders.findIndex(item => item.id === id);

    updatedOrders[updatedItemIndex] = order;
    setOrders(updatedOrders);
    axios
      .put(`/api/orders/${id}`, {
        price: price,
        quantity: quantity,
        sale: sale,
        product: product,
      })
      .then(res => {
        //console.log(res.data);
      })
      .catch(err => {
        //console.log(err);
        enqueueSnackbar('Someting went wrong', {
          variant: 'error',
        });
      });
  };

  const getTotalBySale = id => {
    let total = 0;

    getOrdersBySale(id).forEach(item => {
      total += item.price * item.quantity;
    });

    return total;
  };

  return (
    <SalesContext.Provider
      value={{
        isLoanding: isLoading,
        sales: sales,
        setSales: setSales,
        addSale: addSale,
        deleteSale: deleteSale,
        editSale: editSale,
      }}>
      <OrdersContext.Provider
        value={{
          products: products,
          getOrdersBySale: getOrdersBySale,
          addOrder: addOrder,
          deleteOrder: deleteOrder,
          editOrder: editOrder,
          getProductById: getProductById,
          getTotalBySale: getTotalBySale,
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
      </OrdersContext.Provider>
    </SalesContext.Provider>
  );
};

export { SalesContext };
export { OrdersContext };
export default Sales;
