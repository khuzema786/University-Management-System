import React from 'react';
import { Alert } from '@material-ui/lab';

import { Snackbar } from '../../materialProps';

import { notifStyle } from '../../materialStyles';

export default function Notification(props) {
  const { notify, setNotify } = props;
  const classes = notifStyle();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotify({
      ...notify,
      isOpen: false
    });
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
