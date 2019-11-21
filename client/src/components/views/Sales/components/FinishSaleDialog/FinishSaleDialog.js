import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from '../../../../tools/FormDialog';

import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

import { OrdersContext, SalesContext } from '../../Sales';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {},
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function getChange(pay, total) {
  if (pay >= total) return pay - total;
  else return 0;
}

export function SpanningTable(props) {
  const classes = useStyles();
  const { total, pay, handlePay, orders } = props;

  const invoiceChange = getChange(pay, total);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='spanning table'>
        <TableHead>
          <TableRow>
            <TableCell align='left' colSpan={3}>
              Details
            </TableCell>
            <TableCell align='right'>Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align='right'>Qty.</TableCell>
            <TableCell align='right'>Unit</TableCell>
            <TableCell align='right'>Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(row => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align='right'>{row.qty}</TableCell>
              <TableCell align='right'>{row.unit}</TableCell>
              <TableCell align='right'>{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell align='right' colSpan={2}>
              <Typography gutterBottom variant='body1'>
                Total
              </Typography>
            </TableCell>
            <TableCell align='left'>{ccyFormat(total)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right' colSpan={2}>
              <Typography gutterBottom variant='body1'>
                Pay
              </Typography>
            </TableCell>
            <TableCell colSpan={2} align='left'>
              <TextField
                type='Number'
                value={pay}
                onFocus={event => event.target.select()}
                onChange={handlePay}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='right' colSpan={2}>
              <Typography gutterBottom variant='body1'>
                Change
              </Typography>
            </TableCell>
            <TableCell colSpan={2} align='left'>
              {ccyFormat(invoiceChange)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

const FinishSaleDialog = props => {
  const { open, onClose, sale, ...rest } = props;
  const ordersContext = useContext(OrdersContext);
  const salesContext = useContext(SalesContext);

  const [pay, setPay] = useState(0);

  const rows = ordersContext
    .getOrdersBySale(sale.id)
    .map(item =>
      createRow(
        item.product ? item.product.name : '',
        item.quantity,
        item.price
      )
    );

  const getTotal = rows => {
    let total = 0;
    rows.forEach(item => {
      total += item.price;
    });

    return total;
  };

  const total = getTotal(rows);

  const handlePay = event => {
    setPay(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    salesContext.finishSale(sale, total, pay);
  };
  return (
    <div>
      <FormDialog
        scroll='body'
        {...rest}
        title='Sale Details'
        component={
          <SpanningTable
            total={total}
            sale={sale}
            orders={rows}
            pay={pay}
            handlePay={handlePay}></SpanningTable>
        }
        submitButton={
          <Button
            variant='contained'
            type='submit'
            color='secondary'
            onClick={handleSubmit}
            disabled={pay < total}>
            Finish Sale
          </Button>
        }
        open={open}
        onClose={onClose}
      />
    </div>
  );
};

export default FinishSaleDialog;
