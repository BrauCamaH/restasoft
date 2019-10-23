import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  ButtonBase,
  Button,
  ButtonGroup,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    position: 'relative',
    height: 200,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`,
  },
  imageMarked: {
    height: 3,
    width: 5,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

const CategoryItem = props => {
  const { category, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest}>
      <CardContent>
        <ButtonBase
          focusRipple
          key={category.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: 300,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${category.image.substring(8)})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component='span'
              variant='subtitle1'
              color='inherit'
              className={classes.imageTitle}
            >
              {category.name}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      </CardContent>
      <Divider></Divider>
      <CardActions>
        <ButtonGroup fullWidth>
          <Button color='primary'>Edit</Button>
          <Button className={classes.deleteButton}>Delete</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default CategoryItem;
