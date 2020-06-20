import * as Yup from "yup";
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
