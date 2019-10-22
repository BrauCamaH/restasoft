import React, { useState } from 'react';

import UserContext from './user-context';

const GlobalState = props => {
  const [user, setUserState] = useState({
    name: 'Braulio Huerta',
    username: 'admin',
    password: 'password',
    type: 'Administrator',
    phone: '012345234',
    email: 'admind@gmail.com',
  });

  const [userId, setUserId] = useState(0);

  const updateUser = user => {};

  const setUser = user => {
    setUserState(state => ({
      ...state,
      user,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        userId: userId,
        updateUser: updateUser,
        setUserId: setUserId,
        setUser: setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default GlobalState;
