import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import palette from '../../../../theme/palette';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  Select,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { FormDialog } from '../../../../tools';
import Overview from './Overview';
import { options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const LatestSales = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({});
  const [selectedFilter, setSelectedFilter] = React.useState(new Date());
  const handleChange = event => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    axios.get(`/api/sales/finished/latest`).then(res => {
      const labels = res.data.rows.map(row =>
        new Date(row.finish).toDateString()
      );
      // const amount = res.data.rows.map(row => row.count);
      const sum = res.data.rows.map(row => row.sum);

      const datasets = [
        // {
        //   label: 'Sales Amount',
        //   backgroundColor: palette.primary.main,
        //   data: amount,
        // },
        {
          label: 'Total Revenue',
          backgroundColor: palette.primary.main,
          data: sum,
        },
      ];

      const data = { labels: labels, datasets: datasets };
      setData(data);
    });
  }, []);

  const getLastNDays = n => {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - (n + 1));
    return new Date(yesterday).toDateString();
  };
  const componentRef = useRef();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={
        //   <Select
        //     native
        //     variant='outlined'
        //     value={selectedFilter}
        //     onChange={handleChange}>
        //     <option value={getLastNDays(2)}>Last 2 days</option>
        //     <option value={getLastNDays(3)}>Lat 3 days</option>
        //     <option value={getLastNDays(3)}>Lat 3 days</option>
        //     <option value={getLastNDays(4)}>Lat 4 days</option>
        //     <option value={getLastNDays(3)}>Lat 5 days</option>
        //     <option value={getLastNDays(3)}>Lat 6 days</option>
        //     <option value={getLastNDays(3)}>Lat 7 days</option>
        //   </Select>
        // }
        action={
          <ReactToPrint
            trigger={() => <Button color='secondary'>Print</Button>}
            content={() => componentRef.current}
          />
        }
        title='Latest Sales'
      />
      <Divider />
      <CardContent ref={componentRef}>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          onClick={() => {
            setOpenDialog(true);
          }}
          color='primary'
          size='small'
          variant='text'>
          Overview <ArrowRightIcon />
        </Button>
        <FormDialog
          title='Overview'
          scroll='body'
          component={<Overview />}
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
          }}
        />
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string,
};

export default LatestSales;
