import React from 'react';
import {
	TextField
} from '@mui/material';
import { NumericFormat } from 'react-number-format';

const NumericFormatCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const {
      onChange,
      dollarPrefix = false,
      ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        allowNegative={false}
        {...(dollarPrefix && {prefix: "$"})}
      />
    );
  },
);

export default function TextFieldCurrency({
	handleChange,
  dollarPrefix = false,
	...props
}) {
	return (
		<TextField
      {...props}
      onChange={handleChange}
      name="numberformat"
      InputProps={{
        inputComponent: NumericFormatCustom,
        inputProps: {
          dollarPrefix: dollarPrefix
        }
      }}/>
	)
}