import React, { useState, useEffect, createContext } from 'react';
import { ClientsTable } from './components';

import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const ClientsContext = createContext({
  clients: [],
  addClient: client => {},
  deleteClient: id => {},
  editClient: client => {},
  setClients: clients => {},
  isLoading: true,
});

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Clients = () => {
  const classes = useStyles();

  const [clients, setClients] = useState([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/clients`)
      .then(res => {
        setClients(res.data);
        setIsLoading(false);
        //console.log(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  const addClient = client => {
    //console.log(`Adding client `, client);
    axios
      .post(`/api/clients`, {
        name: client.name,
        rfc: client.rfc,
        city: client.city,
        address: client.address,
        zipcode: client.zipcode,
        colony: client.colony,
        phone: client.phone,
      })
      .then(res => {
        //console.log(res.data);
        const updatedClients = [...clients];
        updatedClients.push(res.data);
        setClients(updatedClients);

        enqueueSnackbar('Client Added', {
          variant: 'success',
        });
        setTimeout(closeSnackbar, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const editClient = client => {
    console.log(`Editing client `, client);
  };
  const deleteClient = id => {
    console.log(`Client Deleted with id ${id}`);
  };

  return (
    <ClientsContext.Provider
      value={{
        isLoading: isLoading,
        clients: clients,
        setClients: setClients,
        addClient: addClient,
        deleteClient: deleteClient,
        editClient: editClient,
      }}>
      <div className={classes.root}>
        <ClientsTable></ClientsTable>
      </div>
    </ClientsContext.Provider>
  );
};

export { ClientsContext };
export default Clients;