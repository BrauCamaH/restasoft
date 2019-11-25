import React, { useState } from 'react';

import UserContext from './user-context';

const GlobalState = props => {
  const [user, setUser] = useState(null);

  const updateUser = user => {};

  return (
    <UserContext.Provider
      value={{
        user: user,
        updateUser: updateUser,
        setUser: setUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default GlobalState;
