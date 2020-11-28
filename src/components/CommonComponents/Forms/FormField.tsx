import React from "react";
import { TextField } from "@material-ui/core";
import "./FormField.scss";

const FormField = ({
  id,
  required,
  onChange,
  type,
  label,
  icon,
  iconPosition,
  error,
  errorText,
  className,
  size,
  fullWidth,
}: any) => {
  const defaultSize = "small";
  return (
    <TextField
      classes={{ root: "formField" }}
      size={size || defaultSize}
      variant="outlined"
      id={id}
      fullWidth={fullWidth}
      margin="normal"
      className={className}
      label={label}
      type={type}
      onChange={onChange}
      required={required}
      error={error}
      helperText={error ? errorText : required ? "Required Field" : ""}
      InputProps={{ [`${iconPosition}Adornment`]: icon }}
    />
  );
};

export default FormField;
