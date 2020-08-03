import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openPopUpAction } from "../../redux/actions/user-actions";
import * as userActions from "../../redux/actions/user-actions";

function RegisterPage(props: any) {
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  // reset login status
  // useEffect(() => {
  //     dispatch(userActions.logout());
  // }, []);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    setSubmitted(true);
    if (user.first_name && user.last_name && user.username && user.password) {
      dispatch(userActions.register(user));
    }
  }

  return (
    <div className="col-lg-8 offset-lg-2">
      <h2>Register</h2>
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.first_name ? " is-invalid" : "")
            }
          />
          {submitted && !user.first_name && (
            <div className="invalid-feedback">First Name is required</div>
          )}
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.first_name ? " is-invalid" : "")
            }
          />
          {submitted && !user.first_name && (
            <div className="invalid-feedback">First Name is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.last_name ? " is-invalid" : "")
            }
          />
          {submitted && !user.last_name && (
            <div className="invalid-feedback">Last Name is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.username ? " is-invalid" : "")
            }
          />
          {submitted && !user.username && (
            <div className="invalid-feedback">Username is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.password ? " is-invalid" : "")
            }
          />
          {submitted && !user.password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            {/* <span className="spinner-border spinner-border-sm mr-1"></span> */}
            Register
          </button>
          <button
            onClick={() => {
              dispatch(openPopUpAction("Connect"));
            }}
          >
            {" "}
            Connect
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
