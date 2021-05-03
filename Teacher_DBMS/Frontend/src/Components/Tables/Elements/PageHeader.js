import React from 'react';

import { Paper, Card, Typography } from '../../materialProps';

import { pageStyle } from '../../materialStyles';

function PageHeader(props) {
  const classes = pageStyle();
  const { title, subTitle, icon } = props;
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default PageHeader;
