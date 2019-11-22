import React, { useState } from "react";

import InputText from "../components/input-text/input-text";
import WeShopButton from "../components/we-shop-button/we-shop-button";
import ConnectService from "../../services/connect-service";
import { Formik } from "formik";
import * as Yup from "yup";

import "./sign-in.scss";
const SignIn = prop => (
  //const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [newUser, setNewUSer] = useState("");
  // const [validMail, setValidMail] = useState(false);
  // const [validPassword, setValidPassword] = useState(false);
  // const [validConfirmPassword, setValidConfirmPassword] = useState(false);

  // function onConfirm() {
  //   if (newUser) {
  //     ConnectService.register({
  //       email: email,
  //       password: password
  //     });
  //   } else {
  //     ConnectService.connect({
  //       email: email,
  //       password: password
  //     });
  //   }
  //   props.onClose();
  // }
  // function onCanncel() {
  //   props.onClose();
  // }

  // return (
  <Formik
    initialValues={{
      email: "",
      password: "",
      confirmPassword: "",
      newUser: false
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
    onSubmit={async values => {
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(JSON.stringify(values, null, 2));
    }}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      function inputEmail() {
        return (
          <div className="input-container">
            <InputText
              className={errors.password && touched.password && "error"}
              name={"email"}
              valid={!errors.email && touched.email}
              placeholder={"Email"}
              type={"email"}
              value={values.email}
              id={"username"}
              onChange={handleChange}
              handleBlur={handleBlur}
            ></InputText>
            {errors.email && touched.email && (
              <div className="input-feedback">{errors.email}</div>
            )}
          </div>
        );
      }
      function inputPassword() {
        return (
          <div className="input-container">
            <InputText
              className={errors.password && touched.password && "error"}
              name={"password"}
              valid={!errors.password && touched.password}
              placeholder={"Password"}
              textVissible={false}
              type={"password"}
              value={values.password}
              onChange={handleChange}
              id="password"
              handleBlur={handleBlur}
            ></InputText>
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}
          </div>
        );
      }
      function inputConfirmPassword() {
        if (values.newUser) {
          return (
            <InputText
              className={errors.password && touched.password && "error"}
              name={"confirmPassword"}
              // valid={validConfirmPassword}
              placeholder={"Confirm Password"}
              textVissible={false}
              type={"password"}
              value={values.confirmPassword}
              onChange={handleChange}
              handleBlur={handleBlur}
            ></InputText>
          );
        }
      }
      function onCanncel() {
        prop.onClose();
      }
      function onRegister(tab) {
        prop.onRegister(tab);
      }
      return (
        <form onSubmit={handleSubmit}>
          <div className="sign-in-container">
            <div className="input-container">
              <div className="input-fields-container">
                {inputEmail()} {inputPassword()} {inputConfirmPassword()}
              </div>
              <div className="buttons">
                <WeShopButton
                  type="submit"
                  disable={isSubmitting}
                  // onClick={handleSubmit}
                  text={values.newUser ? "Register" : "Connect"}
                ></WeShopButton>
                <WeShopButton
                  seconderyButton={true}
                  onClick={e => onCanncel()}
                  text={"cancel"}
                ></WeShopButton>
              </div>
            </div>
            <div className="new-user-container">
              <WeShopButton
                className={errors.password && touched.password && "error"}
                onClick={e => (values.newUser = !values.newUser)}
                text={values.newUser ? "I already have an acount" : "register"}
                onClick={e => onRegister("Register")}
              ></WeShopButton>
            </div>
          </div>
        </form>
      );
    }}
    {/* {props => {
      const {
        values,
        touched,
        errors,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ display: "block" }}>
            Email
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email ? "text-input error" : "text-input"
            }
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}

          <button
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </button>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      );
    }} */}
  </Formik>
);
//}
export default SignIn;
