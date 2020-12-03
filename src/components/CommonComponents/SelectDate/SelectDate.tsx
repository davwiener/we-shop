import React from "react";
import TextField from "@material-ui/core/TextField";
import { startCase } from "lodash";
import "./SelectDate.scss";

const SelectDate = ({
  label,
  onChange,
  required,
  disabled,
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
      required={required}
      label={startCase(label)}
      onChange={onChange}
      disabled={disabled}
      type="datetime-local"
      InputLabelProps={InputLabelProps}
      defaultValue={defaultValue}
    />
  );
};

export default SelectDate;
