import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(15),
    width: '100%',
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
    data: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  // const getData = () => {
  //   setIsLoading(true);
  //   fetch('http://localhost:8080/tables')
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch.');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       setIsLoading(false);
  //       console.log(data[0].id);
  //       setState({ ...state, data });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // };

  const sendData = (code, observations) => {
    axios
      .post('http://localhost:8080/tables/', {
        code: code,
        observations: observations,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const getDataAxios = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/tables')
      .then(res => {
        setIsLoading(false);
        const data = res.data;
        setState({ ...state, data });
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const updateData = (id,code, observations) => {
    axios
      .put(`http://localhost:8080/tables/${id}`, {
          code: code,
          observations: observations,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const deleteData = id => {
    axios
      .delete(`http://localhost:8080/tables/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getDataAxios();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Skeleton
          variant='rect'
          className={classes.root}
          width={400}
          height={400}
        ></Skeleton>
      ) : (
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

                  sendData(newData.code, newData.observations);
                }, 100);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });

                  updateData(newData.id, newData.code, newData.observations);
                }, 100);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });

                  deleteData(oldData.id);
                }, 100);
              }),
          }}
        />
      )}
    </div>
  );
}
