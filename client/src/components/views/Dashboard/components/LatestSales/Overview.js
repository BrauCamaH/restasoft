import React, { useState, useEffect } from 'react';

import { CustomMaterialTable } from '../../../../tools';
import axios from 'axios';

const Overview = () => {
  const [columns] = useState([
    {
      title: 'Finish',
      field: 'finish',
    },
    {
      title: 'Total Revenue',
      field: 'sum',
    },
    {
      title: 'Total Sales',
      field: 'count',
    },
  ]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/sales/finished/latest`).then(res => {
      setData(
        res.data.rows.map(row => ({
          finish: new Date(row.finish).toDateString(),
          sum: row.sum,
          count: row.count,
        }))
      );
    });
  }, []);

  return (
    <CustomMaterialTable
      title=''
      data={data}
      columns={columns}
      options={{
        search: false,
      }}
      options={{
        exportButton: true,
      }}
    />
  );
};

export default Overview;
