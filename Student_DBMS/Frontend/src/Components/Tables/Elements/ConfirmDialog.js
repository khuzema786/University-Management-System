import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '../../materialProps';

import { NotListedLocationIcon } from '../../materialIcons';

import Button from './Button';

import { confStyle } from '../../materialStyles';

function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = confStyle();

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button text="No" color="default" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />
        <Button text="Yes" color="secondary" onClick={confirmDialog.onConfirm} />
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
