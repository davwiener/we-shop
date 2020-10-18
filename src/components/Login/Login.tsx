import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Fingerprint } from "@material-ui/icons";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Button from "@material-ui/core/Button";
import { signIn, signInSuccess } from "../../redux/actions/menu";
import { useHistory, Link } from "react-router-dom";
import Form from "../CommonComponents/Forms/Form";
import FormField from "../CommonComponents/Forms/FormField";

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
    <div className="register">
      <Link to="/register" className="title">
        Click to create an account
      </Link>
    </div>
  );

  const formHeader = () => "Have an account? Sign In";

  return (
    <Form header={formHeader()} footer={formFooter()}>
      <FormField
        icon={<AlternateEmailIcon className="icon" />}
        id="email"
        label="Email"
        type="email"
        value={userName}
        onChange={onChangeUserName}
        fullWidth
        autoFocus
      />
      <FormField
        icon={<Fingerprint className="icon" />}
        id="password"
        label="Password"
        type="password"
        onChange={onChangePassword}
        fullWidth
      />
      <Button
        id="loginButton"
        className="button"
        variant="contained"
        onClick={handleSignIn}
      >
        Login
      </Button>
    </Form>
  );
};

export default Login;
