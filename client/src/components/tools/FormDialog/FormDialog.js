import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  cancelButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function FormDialog(props) {
  const {
    title,
    className,
    component: Component,
    open,
    onClose,
    submitButton,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <Dialog
        {...rest}
        open={open}
        onClose={onClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle aria-labelledby='customized-dialog-title'>
          {title ? title : ''}
          <IconButton
            className={classes.closeButton}
            onClick={onClose}
            color='primary'>
            <EditIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{Component}</DialogContent>
        <DialogActions>
          {submitButton ? (
            <div>
              <Button
                className={classes.cancelButton}
                onClick={onClose}
                color='primary'>
                Cancel
              </Button>
              {submitButton}
            </div>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
