import React from 'react';
import { Settings, Profile } from './components';

import Account from './Account';

export default {
  title: 'Account',
};

export const account = () => <Account></Account>;

export const profile = () => <Profile></Profile>;
export const settings = () => <Settings></Settings>;
