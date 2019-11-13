import React, { useState, useEffect, useContext } from 'react';
import MaterialTable from 'material-table';
//import useAxios from 'axios-hooks';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import { forwardRef } from 'react';
import AddOrder from './AddOrder';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import TextField from '@material-ui/core/TextField';

import Select from 'react-select';

import { SalesContext } from '../../Sales';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Orders = props => {
  const { orders, classes } = props;
  const context = useContext(SalesContext);
  // const [{ data: products, error }, refetchProducts] = useAxios(
  //   `/api/products`,
  // );

  const [state, setState] = useState({
    columns: [
      {
        title: 'Product',
        field: 'name',
        headerStyle: { width: 150 },
        editComponent: props => (
          <Select
            className='basic-single'
            options={context.products.map(product => ({
              value: product.id,
              label: `${product.name}  $${product.price}`,
            }))}
            onChange={e => props.onChange(e.label)}
          />
        ),
      },
      {
        title: 'Price',
        field: 'price',
        editComponent: props => (
          <TextField
            type='number'
            value={props.value || ''}
            onChange={e => props.onChange(e.target.value)}
          />
        ),
      },
      {
        title: 'Quantity',
        field: 'quantity',
        editComponent: props => (
          <TextField
            type='number'
            value={props.value || ''}
            onChange={e => props.onChange(e.target.value)}
          />
        ),
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateOrder = order => {
    // const {id,product, quantity}
    // axios
    //   .put(`api/tables/${id}`, {
    //     code: code,
    //     observations: observations,
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err.response);
    //   });
  };

  const deleteOrder = id => {
    // axios
    //   .delete(`api/tables/${id}`)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err.response);
    //   });
  };

  const getProductById = id => {
    return context.products.find(product => product.id === id);
  };
  const getOrders = () => {
    return orders.map(order => ({
      id: getProductById(order.product).id,
      name: getProductById(order.product).name,
      price: getProductById(order.product).price,
      quantity: order.quantity,
    }));
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton
          variant='rect'
          //className={classes.root}
          width={'90%'}
          height={320}></Skeleton>
      ) : (
        <div>
          <AddOrder products={context.products}></AddOrder>
          <MaterialTable
            icons={tableIcons}
            width='100%'
            heigth='100%'
            title=''
            columns={state.columns}
            data={getOrders()}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });

                  updateOrder(newData);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });

                  deleteOrder(oldData.id);
                }),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
