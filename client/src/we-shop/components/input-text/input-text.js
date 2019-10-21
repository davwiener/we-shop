import React from "react";

function InputText(props) {
  return (
    <form>
      <input
        placeholder={props.placeholder}
        type={props.type ? props.type : ""}
        value={props.value}
        onChange={e => props.setValue(e.target.value)}
      />
    </form>
  );
}

export default InputText;
