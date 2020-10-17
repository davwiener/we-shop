import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Paper, TextField } from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { signIn, signInSuccess } from "../../redux/actions/menu";
import "./Login.scss";
import { useHistory } from "react-router-dom";

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

  return (
    <Paper className="paper" elevation={5}>
      <div className="title">Already have an account? Sign In</div>
      <Divider variant="middle" className="divider" />
      <div className="field">
        <AlternateEmailIcon className="icon" />
        <TextField
          id="username"
          label="Username"
          type="email"
          value={userName}
          onChange={onChangeUserName}
          fullWidth
          autoFocus
          required
        />
      </div>
      <div className="field" id="password">
        <Fingerprint className="icon" />
        <TextField
          id="username"
          label="Password"
          type="password"
          onChange={onChangePassword}
          fullWidth
          required
        />
      </div>
      <Button
        id="loginButton"
        className="loginButton"
        variant="contained"
        onClick={handleSignIn}
      >
        Login
      </Button>
    </Paper>
  );
};

export default Login;
