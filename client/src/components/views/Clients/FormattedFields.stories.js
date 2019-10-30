import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { NumberFormatCustom, TextMaskCustom } from '../../tools';

export default {
  title: 'Format',
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));
export function FormattedInputs() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    textmask: '(1  )    -    ',
    numberformat: '1320',
  });

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='formatted-text-mask-input'>
          react-text-mask
        </InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange('textmask')}
          id='formatted-text-mask-input'
          inputComponent={TextMaskCustom}
          onFocus={e => e.target.select()}
        />
      </FormControl>
      <TextField
        onFocus={e => e.target.select()}
        className={classes.formControl}
        label='react-number-format'
        value={values.numberformat}
        onChange={handleChange('numberformat')}
        id='formatted-numberformat-input'
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </div>
  );
}
