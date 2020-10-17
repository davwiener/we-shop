import React from "react";
import { TextField } from "@material-ui/core";

const FormField = ({
  id,
  icon,
  required,
  onChange,
  type,
  label,
  fullWidth,
  error,
  errorText,
  className,
}: any) => {
  return (
    <div className="field" id="password">
      {icon}
      <TextField
        id={id}
        className={className}
        label={label}
        type={type}
        onChange={onChange}
        fullWidth={fullWidth}
        required={required}
        error={error}
        helperText={error ? errorText : required ? "Required Field" : ""}
      />
    </div>
  );
};

export default FormField;
