import React, { useState } from "react";

import InputText from "../components/input-text/input-text";
import ConfirmButton from "../components/we-shop-button/we-shop-button";
import ConnectService from "../../services/connect-service";
import "./small-sign-in.scss";
function SmallSignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function inputEmail() {
    return (
      <InputText
        placeholder={"example@gmail.com"}
        type={"email"}
        value={email}
        setValue={e => setEmail(e)}
      ></InputText>
    );
  }
  function inputPassword() {
    return (
      <InputText
        placeholder={"?????"}
        textVissible={false}
        type={"password"}
        value={password}
        setValue={pass => setPassword(pass)}
      ></InputText>
    );
  }
  function inputConfirmPassword() {
    if (props.newUser) {
      return (
        <InputText
          placeholder={"?????"}
          textVissible={false}
          type={"password"}
          value={confirmPassword}
          setValue={pass => setConfirmPassword(pass)}
        ></InputText>
      );
    }
  }
  function onConfirm() {
    if (props.newUser) {
      ConnectService.register({
        email: email,
        password: password
      });
    } else {
      ConnectService.connect({
        email: email,
        password: password
      });
    }
  }
  return (
    <div>
      {inputEmail()} {inputPassword()} {inputConfirmPassword()}
      <ConfirmButton onClick={onConfirm}></ConfirmButton>
    </div>
  );
}
export default SmallSignIn;
