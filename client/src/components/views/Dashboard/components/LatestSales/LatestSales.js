import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
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

  const getYestesday = () => {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);
    return new Date(yesterday).toDateString();
  };

  const getLast3Days = () => {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 2);
    return new Date(yesterday).toDateString();
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Select
            native
            variant='outlined'
            value={selectedFilter}
            onChange={handleChange}>
            <option value={new Date()}>Today</option>
            <option value={getYestesday()}>Yesterday</option>
            <option value={getLast3Days()}>Lat 3 days</option>
            <option value={new Date()}>This Week</option>
            <option value={new Date()}>Last Week</option>
            <option value={new Date()}>This Month</option>
            <option value={new Date()}>Last Month</option>
          </Select>
        }
        title='Latest Sales'
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color='primary' size='small' variant='text'>
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestSales.propTypes = {
  className: PropTypes.string,
};

export default LatestSales;
