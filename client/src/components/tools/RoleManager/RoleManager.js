import React, { useContext } from 'react';
import UserContext from '../../../context/user-context';

const RoleManager = props => {
  const { children, component: Component, customReturn: CustomReturn } = props;
  const context = useContext(UserContext);

  return (
    <>
      {context.user.type !== 'Administrator' ? (
        CustomReturn || null
      ) : (
        <>{Component || children}</>
      )}
    </>
  );
};

export default RoleManager;
