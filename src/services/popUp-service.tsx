import * as Yup from "yup";
import SignIn from "../components/sign-in/sign-in";
import React from "react";

const PopUpService = {
  openPopup(tabName: string) {
    switch (tabName) {
      case "My Acount": {
        break;
      }
      case "Products": {
        break;
      }
      case "Today's Deals": {
        break;
      }
      case "Help": {
        break;
      }
      case "Register": {
        return (
          <SignIn
            newUser={true}
            onRegister={(tab: string) => this.openPopup(tab)}
            inputs={["email", "password", "confirmPassword"].map(
              (input: string) => usableInputs[input]
            )}
            secunedFuncVar="Connect"
            secunedFunc={(tab: string) => this.openPopup(tab)}
            text={"Connect"}
          ></SignIn>
        );
      }
      case "Connect": {
        return (
          <SignIn
            newUser={true}
            onRegister={(tab: string) => this.openPopup(tab)}
            inputs={["email", "password"].map((input) => usableInputs[input])}
            secunedFunc={(tab: string) => this.openPopup(tab)}
            secunedFuncVar="Register"
          ></SignIn>
        );
      }
      default: {
        console.log("Register");
        break;
      }
    }
  },
};
export const usableInputs: any = {
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    validateFunc: Yup.string().email().required("Required"),
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
    validateFunc: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    placeholder: "confirm Password",
    validateFunc: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  },
};
export default PopUpService;
