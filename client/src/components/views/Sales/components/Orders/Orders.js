import React, { useState, useContext } from 'react';
import MaterialTable from 'material-table';
import Skeleton from '@material-ui/lab/Skeleton';
import { forwardRef } from 'react';
import AddOrder from './AddOrder';

import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';

import TextField from '@material-ui/core/TextField';

import { OrdersContext } from '../../Sales';

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
  const { sale, classes } = props;
  const context = useContext(OrdersContext);

  const [columns] = useState([
    {
      title: 'Product',
      field: 'name',
      editable: 'never',
    },
    {
      title: 'Price',
      field: 'price',
      editable: 'never',
    },
    {
      title: 'Quantity',
      field: 'quantity',
      editComponent: props => (
        <TextField
          type='number'
          value={props.value || ''}
          onFocus={event => event.target.select()}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
    },
  ]);

  const [isLoading] = useState(false);

  return (
    <div>
      {isLoading ? (
        <Skeleton variant='rect' className={classes}>
          width={'90%'}
          height={320}>
        </Skeleton>
      ) : (
        <div className={classes}>
          <AddOrder products={context.products} sale={sale}></AddOrder>
          <MaterialTable
            icons={tableIcons}
            width='100%'
            heigth='100%'
            title=''
            columns={columns}
            data={context.getOrdersBySale(sale.id).map(order => ({
              id: order.id,
              product: order.product.id,
              sale: order.sale,
              name: order.product.name,
              price: order.price,
              quantity: order.quantity,
            }))}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  resolve();
                  context.editOrder(newData);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  resolve();
                  context.deleteOrder(oldData.id);
                }),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
