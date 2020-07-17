import InputText from "../components/input-text/input-text";
import WeShopButton from "../components/we-shop-button/we-shop-button";
import ConnectService from "../../services/connect-service";
import { Formik } from "formik";
import * as Yup from "yup";
import "./sign-in.scss";
import React from "react";
import {
  openPopUpAction,
  closePopUpAction,
} from "../../reducers/user-reducer/user-actions";
import { useDispatch } from "react-redux";

export const SignIn = (prop: any) => {
  const dispatch = useDispatch();
  return (
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
          <form className="form" onSubmit={handleSubmit}>
            <div className="sign-in-container">
              <div className="input-container">
                <div className="input-fields-container">
                  {prop.inputs.map((inputVals: any) => input(inputVals))}
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
                    onClick={(e: any) => dispatch(closePopUpAction())}
                    text={"cancel"}
                  ></WeShopButton>
                </div>
              </div>

              {prop.text !== "" && prop.text && (
                <div className="new-user-container">
                  <WeShopButton
                    className={errors.password && touched.password && "error"}
                    text={prop.text}
                    onClick={(e: any) =>
                      (values.newUser = !values.newUser) &&
                      prop.secunedFunc(prop.secunedFuncVar)
                    }
                  ></WeShopButton>
                </div>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
//}
export default SignIn;
