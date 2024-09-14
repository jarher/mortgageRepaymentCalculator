/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { NumericFormat } from "react-number-format";
//return input value with thousand (",") separator
export const NumberInput = ({ formComponent, formProps }) => {
  const { fieldProps, value, ...rest } = formProps;
  return (
    <NumericFormat
      value={value}
      thousandSeparator
      customInput={formComponent}
      {...rest}
      {...fieldProps}
    />
  );
};
