import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {EmailOutlined } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { signIn, signInSuccess } from "../../redux/actions/menu";
import { useHistory, Link } from "react-router-dom";
import Form from "../CommonComponents/Forms/Form";
import FormField from "../CommonComponents/Forms/FormField";
import "./Login.scss";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { InputAdornment } from "@material-ui/core";

const Login = (props: any) => {
  useEffect(() => {
    const loginButton = document.getElementById("password");
    loginButton?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("loginButton")?.click();
      }
    });
  }, []);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignIn = () => {
    signIn(userName, password).then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        dispatch(signInSuccess(res.data));
        history.push("/");
      } else {
        // dispatch(signInFailed(res))
      }
    });
  };

  const onChangeUserName = (e: any) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const formFooter = () => (
    <Link to="/register">Click to create an account</Link>
  );

  const formHeader = () => "Have an account? Sign In";

  const renderPasswordIcon = (position: any) => (
    <InputAdornment position={position}>
      <LockOpenIcon />
    </InputAdornment>
  );

  const renderEmailIcon = (position: any) => (
    <InputAdornment position={position}>
      <EmailOutlined />
    </InputAdornment>
  );

  return (
    <Form header={formHeader()} footer={formFooter()}>
      <FormField
        size="small"
        iconPosition="end"
        icon={renderEmailIcon("end")}
        label="Email"
        type="email"
        value={userName}
        onChange={onChangeUserName}
        autoFocus
        fullWidth
      />
      <FormField
        fullWidth
        size="small"
        iconPosition="end"
        icon={renderPasswordIcon("end")}
        label="Password"
        type="password"
        onChange={onChangePassword}
      />
      <Button
        classes={{ root: "loginButton" }}
        variant="contained"
        onClick={handleSignIn}
      >
        Login
      </Button>
    </Form>
  );
};

export default Login;
