import React, { useRef, useState, Fragment } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import classes from "./Register.module.scss";

const isEmpty = (value) => value.trim() === "";

const Register = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();
  const addressInputRef = useRef();
  const emailInputRef = useRef();

  const from = location.state?.from?.pathname || "/";

  const [formInputSValidity, setFormInputsValidity] = useState({
    username: true,
    password: true,
    phone: true,
    address: true,
    email: true,
  });

  const registerHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const enteredUsernameIsValid = !isEmpty(enteredUsername);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);
    const enteredPhoneIsValid = !isEmpty(enteredPhone);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredEmailIsValid = !isEmpty(enteredEmail);

    const formIsValid =
      enteredUsernameIsValid &&
      enteredPasswordIsValid &&
      enteredPhoneIsValid &&
      enteredAddressIsValid &&
      enteredEmailIsValid;

    setFormInputsValidity({
      username: enteredUsernameIsValid,
      password: enteredPasswordIsValid,
      phone: enteredPhoneIsValid,
      address: enteredAddressIsValid,
      email: enteredEmailIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      username: enteredUsername,
      password: enteredPassword,
      phone: enteredPhone,
      address: enteredAddress,
      email: enteredEmail,
    });

    navigate(from, { replace: true });
  };

  const usernameControlClasses = `${classes.control} ${
    formInputSValidity.username ? "" : classes.invalid
  }`;
  const passwordControlClasses = `${classes.control} ${
    formInputSValidity.password ? "" : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInputSValidity.address ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputSValidity.phone ? "" : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    formInputSValidity.email ? "" : classes.invalid
  }`;

  const foodAppregisterContent = (
    <Fragment>
      <form className={classes.form} onSubmit={registerHandler}>
        <div className={usernameControlClasses}>
          <label htmlFor="username">Account</label>
          <input
            type="text"
            className={classes["form-control"]}
            id="username"
            ref={usernameInputRef}
          />
          {!formInputSValidity.username && <p>Please enter username</p>}
        </div>

        <div className={passwordControlClasses}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            className={classes["form-control"]}
            id="password"
            ref={passwordInputRef}
          />
          {!formInputSValidity.password && <p>Please enter password</p>}
        </div>

        <div className={emailControlClasses}>
          <label htmlFor="email">Địa chỉ email</label>
          <input
            type="text"
            className={classes["form-control"]}
            id="email"
            ref={emailInputRef}
          />
          {!formInputSValidity.email && <p>Please enter email</p>}
        </div>

        <div className={phoneControlClasses}>
          <label htmlFor="phone">Số Điện thoại</label>
          <input
            type="text"
            className={classes["form-control"]}
            id="phone"
            ref={phoneInputRef}
          />
          {!formInputSValidity.phone && <p>Please enter phone</p>}
        </div>

        <div className={addressControlClasses}>
          <label htmlFor="address">Địa Chỉ</label>
          <input
            type="text"
            className={classes["form-control"]}
            id="address"
            ref={addressInputRef}
          />
          {!formInputSValidity.address && <p>Please enter address</p>}
        </div>

        <div className={classes.actions}>
          <button className={classes.submit}>Submit</button>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </form>
    </Fragment>
  );

  const isSubmittingregisterContent = <p>Sending register Data ...</p>;

  const didSubmitregisterContent = (
    <Fragment>
      <p>Successfully sent the register!</p>
      <div className={classes.action}>
        <button className={classes.button} onClick={props.onHidePopup}>
          Finish
        </button>
      </div>
    </Fragment>
  );

  return (
    <div className={classes["form-block"]}>
      {!props.isSubmitting && !props.didSubmit && foodAppregisterContent}
      {props.isSubmitting && isSubmittingregisterContent}
      {!props.isSubmitting && props.didSubmit && didSubmitregisterContent}
    </div>
  );
};

export default Register;
