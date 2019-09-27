import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(15),
    width: '50%',
  },
}));

export default function MaterialTableDemo() {
  const classes = useStyles();

  const [state, setState] = useState({
    columns: [
      {
        title: 'Code ',
        field: 'code',
        headerStyle: { minWidth: 150 },
      },
      {
        title: 'Observations',
        field: 'observations',
        headerStyle: { minWidth: 200 },
      },
    ],
    data: [{ code: 'AbG32', observations: 'Just a observation' }],
  });

  useEffect(() => {
    console.log('mounted');
  }, []);

  return (
    <div style={{ Width: '100%' }}>
      <Grid container spacing={4} className={classes.root}>
        <MaterialTable
          width='100%'
          heigth='100%'
          title='Tables'
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  setState({ ...state, data });
                }, 100);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
                }, 100);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });
                }, 100);
              }),
          }}
        />
      </Grid>
    </div>
  );
}
