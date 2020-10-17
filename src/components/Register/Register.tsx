import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Form from "../common-components/Forms/Form";
import FormField from "../common-components/Forms/FormField";
import { signUp } from "../../redux/actions/menu";
import { useHistory } from "react-router-dom";

const Register = (props: any) => {
  const history = useHistory();
  useEffect(() => {
    const verifyPassword = document.getElementById("verifyPassword");
    verifyPassword?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("signupButton")?.click();
      }
    });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passMaching, setPassMatching] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const handleSignUp = () => {
    if (!email.match(/.+@.+/)) {
      setValidEmail(false);
      return;
    }
    if (password.length < 8) {
      setValidPassword(false);
    }
    if (!(password === verifyPassword)) {
      setPassMatching(false);
      return;
    }
    signUp({
      firstName,
      lastName,
      email,
      password,
    }).then((res) => {
      console.log("RES ==>", res);
      history.push("/");
    });
  };

  const onChangeFirstName = (e: any) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e: any) => {
    setLastName(e.target.value);
  };

  const onChangeEmail = (e: any) => {
    setValidEmail(true);
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setValidPassword(true);
    setPassword(e.target.value);
  };

  const onChangeVerifyPassword = (e: any) => {
    setVerifyPassword(e.target.value);
  };

  return (
    <Form header="Account Creation">
      <div className="flexContainer">
        <FormField
          id="first_name"
          label="First Name"
          type="text"
          onChange={onChangeFirstName}
          required
          fullWidth
        />
        <FormField
          id="last_name"
          label="Last Name"
          type="text"
          onChange={onChangeLastName}
          required
          fullWidth
        />
      </div>
      <FormField
        id="email"
        label="Email"
        type="email"
        onChange={onChangeEmail}
        fullWidth
        required
        error={!validEmail}
        errorText="Invalid Email"
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        onChange={onChangePassword}
        fullWidth
        required
        error={!validPassword}
        errorText="Password must be 8 at least characters long"
      />
      <FormField
        id="password2"
        label="Re-Enter Password"
        type="password"
        onChange={onChangeVerifyPassword}
        fullWidth
        required
        error={!passMaching}
        errorText="Passwords don't match"
      />
      <Button
        id="signupButton"
        className="button"
        variant="contained"
        onClick={handleSignUp}
      >
        Sign-Up
      </Button>
    </Form>
  );
};

export default Register;
