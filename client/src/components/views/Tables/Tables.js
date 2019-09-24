import React from 'react';
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

  const [state, setState] = React.useState({
    columns: [
      { title: 'Code', field: 'code' },
      { title: 'Observations', field: 'observations'},
    ],
    data: [
      { code: 'AbG32', observations :'Just a observation' },
    ],
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <MaterialTable
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
