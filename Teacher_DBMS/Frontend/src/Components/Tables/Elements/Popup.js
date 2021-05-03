import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '../../materialProps';
import ActionButton from './ActionButton';

import { CloseIcon } from '../../materialIcons';

import { popStyle } from '../../materialStyles';

function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = popStyle();

  return (
    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <ActionButton
            color="secondary"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
