import React from "react";
import TextField from "@material-ui/core/TextField";
import { startCase } from "lodash";
import "./Select.scss";

const Select = ({
  label,
  onChange,
  required,
  children,
  disabled,
  type,
  InputLabelProps,
  defaultValue,
  autoFocus,
  value,
}: any) => {
  return (
    <TextField
      margin="normal"
      size="small"
      variant="outlined"
      classes={{ root: "field" }}
      defaultValue={defaultValue}
      value={value}
      select={!type}
      label={startCase(label)}
      onChange={onChange}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
      type={type}
      InputLabelProps={InputLabelProps}
    >
      {children}
    </TextField>
  );
};

export default Select;
