import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import logo from './resta_logo_texto.png';

const Logo = () => {
  return (
    <RouterLink to='/'>
      <img alt='Logo' width={125} height={50} src={logo} />
    </RouterLink>
  );
};

export default Logo;
