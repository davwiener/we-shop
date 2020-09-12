import * as Yup from "yup";
import LoginPage from "../components/login-page/login-page";
import Register from "../components/register-page/register";
import React from "react";
import AddAuction from "../components/add-auction/add-auction";

const PopUpService = {
  openPopup(tabName: string) {
    switch (tabName) {
      case "My Account": {
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
        return <Register></Register>;
      }
      case "Connect": {
        return <LoginPage></LoginPage>;
      }
      case "AddAuction": {
        return <AddAuction></AddAuction>;
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
