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
                  onClick={e => prop.onClose()}
                  text={"cancel"}
                ></WeShopButton>
              </div>
            </div>

            {prop.text !== "" && prop.text && (
              <div className="new-user-container">
                <WeShopButton
                  className={errors.password && touched.password && "error"}
                  onClick={e => (values.newUser = !values.newUser)}
                  text={prop.text}
                  onClick={e => prop.secunedFunc(prop.secunedFuncVar)}
                ></WeShopButton>
              </div>
            )}
          </div>
        </form>
      );
    }}
  </Formik>
);
//}
export default SignIn;
