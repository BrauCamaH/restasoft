import React from 'react';

export default React.createContext({
  user: {
    name: '',
    username: '',
    password: '',
    type: '',
    phone: '',
    email: '',
  },
  userId: 30,
  updateUser: user => {},
  setUserId: id => {},
  setUser: user => {},
});
