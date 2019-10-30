import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import { forwardRef } from 'react';

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

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3),
//     marginTop: theme.spacing(8),
//   },
// }));

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
          width={'90%'}
          height={320}></Skeleton>
      ) : (
        <MaterialTable
          icons={tableIcons}
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
