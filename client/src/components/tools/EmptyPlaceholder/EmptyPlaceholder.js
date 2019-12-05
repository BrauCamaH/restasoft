import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, Container, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: { marginTop: '15%' },
  button: { marginLeft: theme.spacing(0.5), marginRight: theme.spacing(0.5) },
}));

const EmptyPlaceholder = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} component='main' maxWidth={'xs'}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            There is not items to display
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmptyPlaceholder;
