import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
} from '@material-ui/core';

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
            There is not items to Display
          </Typography>
          <br />
          <Typography className={classes.pos} color='textSecondary'>
            You can add a item with the
            {
              <Button
                className={classes.button}
                variant='contained'
                color='primary'>
                Button
              </Button>
            }
            shown in the top right part
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmptyPlaceholder;
