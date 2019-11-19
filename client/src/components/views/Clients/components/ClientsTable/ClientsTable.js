import React, { useState, useContext } from 'react';
import { CustomMaterialTable } from './../../../../tools';
import Skeleton from '@material-ui/lab/Skeleton';

import { ClientsContext } from '../../Clients';
import { ClientFormDialog } from '../index';

const MTable = props => {
  const context = useContext(ClientsContext);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
        <CustomMaterialTable
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
              onClick: event => handleOpen(),
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                resolve();
                newData.id = oldData.id;
                context.editClient(newData);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                resolve();
                context.deleteClient(oldData.id);
              }),
          }}
        />
      )}
      <React.Fragment>
        <ClientFormDialog open={open} onClose={handleClose} />
      </React.Fragment>
    </React.Fragment>
  );
};

export default MTable;
