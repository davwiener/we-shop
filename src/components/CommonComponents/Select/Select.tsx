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
}: any) => {
  return (
    <TextField
      margin="normal"
      size="small"
      variant="outlined"
      classes={{ root: "field" }}
      autoFocus={autoFocus}
      select={!type}
      required={required}
      label={startCase(label)}
      onChange={onChange}
      disabled={disabled}
      type={type}
      InputLabelProps={InputLabelProps}
      defaultValue={defaultValue}
    >
      {children}
    </TextField>
  );
};

export default Select;
