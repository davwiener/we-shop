import React, { useState } from "react";

import InputText from "../input-text/input-text";
import Button from "../button/button";

import { Formik } from "formik";
import * as Yup from "yup";

import "./sign-in.scss";

const SignIn = (prop: any) => (
  <Formik
    initialValues={prop.inputs.reduce(
      (obj: { [x: string]: string }, input: { name: React.ReactText }) => {
        obj[input.name] = "";
        return obj;
      },
      {}
    )}
    validationSchema={Yup.object().shape(
      prop.inputs.reduce(
        (
          obj: { [x: string]: any },
          input: { name: React.ReactText; validateFunc: any }
        ) => {
          obj[input.name] = input.validateFunc;
          return obj;
        },
        {}
      )
    )}
    onSubmit={async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert(JSON.stringify(values, null, 2));
    }}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      function input(inputVals: {
        name: React.ReactText;
        placeholder: any;
        type: any;
      }) {
        return (
          <div className="input-container">
            <InputText
              className={
                errors[inputVals.name] && touched[inputVals.name] && "error"
              }
              name={inputVals.name}
              valid={!errors[inputVals.name] && touched[inputVals.name]}
              placeholder={inputVals.placeholder}
              textVisible={false}
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
                {prop.inputs.map((inputVals: any) => input(inputVals))}
              </div>
              <div className="buttons">
                <Button
                  type="submit"
                  disable={isSubmitting}
                  // onClick={handleSubmit}
                  text={values.newUser ? "Register" : "Connect"}
                ></Button>
                <Button
                  secondaryButton={true}
                  onClick={() => prop.onClose()}
                  text={"cancel"}
                ></Button>
              </div>
            </div>

            {prop.text !== "" && prop.text && (
              <div className="new-user-container">
                <Button
                  className={errors.password && touched.password && "error"}
                  text={prop.text}
                  onClick={(e: any) =>
                    (values.newUser = !values.newUser) &&
                    prop.secondFunc(prop.secondFuncVar)
                  }
                ></Button>
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
