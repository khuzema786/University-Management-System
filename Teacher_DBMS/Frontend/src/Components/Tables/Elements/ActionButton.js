import React from 'react';

import { Button } from '../../materialProps';
import { actionStyle } from '../../materialStyles';

function ActionButton(props) {
  const { color, children, onClick } = props;
  const classes = actionStyle();

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
}

export default ActionButton;
