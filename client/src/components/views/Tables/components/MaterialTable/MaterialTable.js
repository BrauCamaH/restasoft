import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3),
//     marginTop: theme.spacing(8),
//   },
// }));

const MTable = props => {
  const { classes } = props;

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
  const getDataAxios = () => {
    setIsLoading(true);
    axios
      .get('api/tables')
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

  const sendData = (code, observations) => {
    axios
      .post(`api/tables`, {
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

  const updateData = (id, code, observations) => {
    axios
      .put(`api/tables/${id}`, {
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
      .delete(`api/tables/${id}`)
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
    <div>
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
                resolve();
                const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });

                sendData(newData.code, newData.observations);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });

                updateData(newData.id, newData.code, newData.observations);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });

                deleteData(oldData.id);
              }),
          }}
        />
      )}
    </div>
  );
};

export default MTable;
