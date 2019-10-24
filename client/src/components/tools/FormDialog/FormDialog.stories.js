import React from 'react';
import Dialog from './FormDialog';
import { Button } from '@material-ui/core';

export default {
  title: 'FormDialog',
};

const Field = <div>Here is the content</div>;

const button = <Button>Submit</Button>;
export const dialog = () => (
  <div>
    <Dialog
      title='This is the title'
      component={Field}
      action='Add Category'
      SubmitButton={button}
    ></Dialog>
  </div>
);

export const FullDialog = () => (
  <Dialog
    fullScreen
    title='Full dialog'
    action='Add Category'
    component={Field}
  ></Dialog>
);
