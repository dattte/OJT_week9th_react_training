import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";

import user from "../../assets/user";

import classes from "./register.module.scss";

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length > 15) {
    errors.username = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.length > 12) {
    errors.phone = "Must be 12 characters";
  }

  if (!values.address) {
    errors.address = "Required";
  } else if (values.address.length > 20) {
    errors.address = "Must be 20 characters or less";
  }

  return errors;
};

const Register = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    },
    validate,
    onSubmit: (values) => {
      user.push({
        ...values,
        id: Math.floor(Math.random() * 100),
      });

      console.log(user);

      navigate(from, { replace: true });
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className={classes["form-block"]}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div className={classes.control}>
          <label htmlFor="username">username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username ? <div>{formik.errors.username}</div> : null}
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>

        <div className={classes.control}>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            type="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.errors.address ? <div>{formik.errors.address}</div> : null}
        </div>

        <div className={classes.actions}>
          <button type="submit" className={classes.submit}>
            Submit
          </button>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
