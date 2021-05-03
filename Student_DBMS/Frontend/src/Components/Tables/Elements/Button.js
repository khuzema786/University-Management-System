import React from 'react';

import { btnStyle } from '../../materialStyles';
import { Button as MuiButton } from '../../materialProps';

function Button(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = btnStyle();

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}

export default Button;
