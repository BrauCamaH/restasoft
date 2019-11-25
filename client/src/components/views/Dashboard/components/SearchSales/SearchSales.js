import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CustomMaterialTable } from '../../../../tools';
import OrderList from './OrdersBySale';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import axios from 'axios';
import { Typography, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {},
  title: {
    padding: theme.spacing(2),
  },
  filter: { padding: theme.spacing(1.5) },
  button: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(2),
  },
}));
const LatestSales = () => {
  const classes = useStyles();
  const [columns] = useState([
    {
      title: 'Client',
      field: 'client',
    },
    {
      title: 'Table',
      field: 'table',
    },
    {
      title: 'Total',
      field: 'total',
    },
    {
      title: 'Finish Date',
      field: 'finish',
    },
  ]);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const getOrders = () => {
    axios
      .get(`/api/orders`)
      .then(res => {
        setOrders(res.data);
        //console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getProducts = () => {
    axios
      .get(`/api/products`)
      .then(res => {
        setProducts(res.data);
        //console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };
  // const getLatestSales = () => {
  //   const day = new Date().toJSON().substring(0, 10);
  //   return sales.filter(item => item.finish.toLowerCase().includes(day));
  // };

  useEffect(() => {
    getProducts();
    getOrders();
  }, []);

  const tableRef = useRef();
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const handleFromDateChange = date => {
    setSelectedFromDate(date);
  };
  const handleToDateChange = date => {
    setSelectedToDate(date);
  };

  const handleFilter = () => {
    tableRef.current && tableRef.current.onQueryChange();
  };

  return (
    <CustomMaterialTable
      tableRef={tableRef}
      columns={columns}
      data={query =>
        new Promise((resolve, reject) => {
          let url = `/api/sales/paginate/filter?from=${selectedFromDate}&to=${selectedToDate}&page=${query.page +
            1}&pageSize=${query.pageSize}`;
          axios
            .get(url)
            .then(res => {
              resolve({
                data: res.data.rows.map(sale => ({
                  id: sale.id,
                  finish: new Date(sale.finish).toDateString(),
                  client: sale.client.name,
                  table: sale.table.code,
                  total: sale.total,
                })),
                page: res.data.page - 1,
                totalCount: res.data.totalCount,
              });
            })
            .catch(err => {
              console.error(err);
            });
        })
      }
      title='Latest Sales'
      detailPanel={rowData => {
        return (
          <OrderList
            orders={orders
              .filter(order => order.sale === rowData.id)
              .map(order => ({
                id: order.id,
                sale: order.sale,
                product: products.find(product => product.id === order.product),
                price: order.price,
                quantity: order.quantity,
              }))}></OrderList>
        );
      }}
      options={{
        search: false,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'No Sales to display',
          filterRow: {
            filterTooltip: 'Filter',
          },
        },
      }}
      components={{
        Toolbar: props => (
          <div style={{ backgroundColor: '#e8eaf5' }}>
            <Typography color='primary' className={classes.title} variant='h3'>
              Search Sales
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                className={classes.filter}
                format='yyyy/MM/dd'
                inputVariant='outlined'
                label='From'
                value={selectedFromDate}
                onChange={handleFromDateChange}
                orientation='landscape'
                maxDate={new Date()}
              />
              <DatePicker
                className={classes.filter}
                format='yyyy/MM/dd'
                label='To'
                inputVariant='outlined'
                orientation='landscape'
                maxDate={new Date()}
                value={selectedToDate}
                onChange={handleToDateChange}
              />
            </MuiPickersUtilsProvider>
            <IconButton className={classes.button} onClick={handleFilter}>
              <SendIcon />
            </IconButton>
          </div>
        ),
      }}
    />
  );
};

export default LatestSales;
