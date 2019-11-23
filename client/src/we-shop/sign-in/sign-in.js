import React, { useState } from "react";

import InputText from "../components/input-text/input-text";
import WeShopButton from "../components/we-shop-button/we-shop-button";
import ConnectService from "../../services/connect-service";
import { Formik } from "formik";
import * as Yup from "yup";

import "./sign-in.scss";

const SignIn = prop => (
  <Formik
    initialValues={prop.inputs.reduce((obj, input) => {
      obj[input.name] = "";
      return obj;
    }, {})}
    validationSchema={Yup.object().shape(
      prop.inputs.reduce((obj, input) => {
        obj[input.name] = input.validateFunc;
        return obj;
      }, {})
    )}
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
      // function inputEmail() {
      //   return (
      //     <div className="input-container">
      //       <InputText
      //         className={errors.password && touched.password && "error"}
      //         name={"email"}
      //         valid={!errors.email && touched.email}
      //         placeholder={"Email"}
      //         type={"email"}
      //         value={values.email}
      //         id={"username"}
      //         onChange={handleChange}
      //         handleBlur={handleBlur}
      //       ></InputText>
      //       {errors.email && touched.email && (
      //         <div className="input-feedback">{errors.email}</div>
      //       )}
      //     </div>
      //   );
      // }
      function input(inputVals) {
        return (
          <div className="input-container">
            <InputText
              className={
                errors[inputVals.name] && touched[inputVals.name] && "error"
              }
              name={inputVals.name}
              valid={!errors[inputVals.name] && touched[inputVals.name]}
              placeholder={inputVals.placeholder}
              textVissible={false}
              type={inputVals.type}
              value={values[inputVals.name]}
              onChange={handleChange}
              id={inputVals.name}
              handleBlur={handleBlur}
            ></InputText>
            {errors[inputVals.name] && touched[inputVals.name] && (
              <div className="input-feedback">{errors[inputVals.name]}</div>
            )}
          </div>
        );
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
                {prop.inputs.map(inputVals => input(inputVals))}
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
