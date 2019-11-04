import React, { useState, useContext } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
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

import { ClientsContext } from '../../Clients';

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
  const context = useContext(ClientsContext);

  const [state] = useState({
    columns: [
      {
        title: 'Name',
        field: 'name',
      },
      {
        title: 'Rfc',
        field: 'rfc',
      },
      {
        title: 'City',
        field: 'city',
      },
      {
        title: 'Address',
        field: 'address',
      },
      {
        title: 'Zipcode',
        field: 'zipcode',
      },
      {
        title: 'Colony',
        field: 'colony',
      },
      {
        title: 'Phone',
        field: 'phone',
      },
    ],
  });

  return (
    <React.Fragment>
      {context.isLoading ? (
        <Skeleton variant='rect' width={'100%'} height={320}></Skeleton>
      ) : (
        <MaterialTable
          icons={tableIcons}
          width='100%'
          heigth='100%'
          title='Clients'
          columns={state.columns}
          data={context.clients}
          options={{
            grouping: true,
          }}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add Client',
              isFreeAction: true,
              onClick: (event, rowData) =>
                alert('You want to add a client ' + rowData.name),
            },
            {
              icon: 'edit',
              tooltip: 'Delete Client',
              onClick: (event, rowData) =>
                alert('You want to edit ' + rowData.name),
            },
            {
              icon: 'delete',
              tooltip: 'Delete Client',
              onClick: (event, rowData) =>
                alert('You want to delete ' + rowData.name),
            },
          ]}
        />
      )}
    </React.Fragment>
  );
};

export default MTable;
