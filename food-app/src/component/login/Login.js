import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import user from "../../assets/user";

import useAuth from "../../hooks/useAuth";
import Modal from "../../UI/Modal";

import classes from "./Login.module.scss";

const isEmpty = (value) => value.trim() === "";

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const [wrongPopupIsShown, setWrongPopupIsShown] = useState(false);
  const [formInputSValidity, setFormInputsValidity] = useState({
    username: true,
    password: true,
  });

  const from = location.state?.from?.pathname || "/";

  const popupOpenHandler = () => {
    setWrongPopupIsShown(true);
  };

  const popupCloseHandler = () => {
    setWrongPopupIsShown(false);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredUsernameIsValid = !isEmpty(enteredUsername);
    const enteredPasswordIsValid = !isEmpty(enteredPassword);

    const formIsValid = enteredUsernameIsValid && enteredPasswordIsValid;

    setFormInputsValidity({
      username: enteredUsernameIsValid,
      password: enteredPasswordIsValid,
    });

    if (!formIsValid) {
      return;
    }

    const loginUser = user.find((item) => item.username === enteredUsername);

    if (loginUser !== undefined && loginUser.password === enteredPassword) {
      props.onConfirm(loginUser);

      auth.signin(enteredUsername, () => {
        navigate(from, { replace: true });
      });
    } else return popupOpenHandler();
  }

  const usernameControlClasses = `${classes.control} ${
    formInputSValidity.username ? "" : classes.invalid
  }`;
  const passwordControlClasses = `${classes.control} ${
    formInputSValidity.password ? "" : classes.invalid
  }`;

  const foodAppLoginContent = (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleSubmit}>
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

        <div className={classes.actions}>
          <button type="submit" className={classes.submit}>
            Login
          </button>

          <Link to="/register">
            <button onClick={props.onHidePopup}>Register</button>
          </Link>
        </div>
      </form>
    </React.Fragment>
  );

  // const isSubmittingLoginContent = <p>Sending login Data ...</p>;

  const didSubmitLoginContent = (
    <React.Fragment>
      <p>Wrong password or username, please try again</p>
      <div className={classes.action}>
        <button className={classes.button} onClick={popupCloseHandler}>
          Finish
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <div className={classes["form-block"]}>
      {!props.isSubmitting && !props.didSubmit && foodAppLoginContent}
      {wrongPopupIsShown && (
        <Modal onClick={popupCloseHandler}>{didSubmitLoginContent}</Modal>
      )}
      {/* {props.isSubmitting && isSubmittingLoginContent}
      {!props.isSubmitting && props.didSubmit && didSubmitLoginContent} */}
    </div>
  );
};

export default Login;
