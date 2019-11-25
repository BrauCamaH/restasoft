import React from 'react';

export default React.createContext({
  user: {
    id: 0,
    name: '',
    username: '',
    type: '',
  },
  updateUser: user => {},
  setUser: user => {},
});
