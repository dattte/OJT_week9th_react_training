import { useRef } from "react";
import { useState, Fragment } from "react";

import Modal from "../../UI/Modal";

import classes from "./CustomAddressPopup.module.scss";

const isEmpty = (value) => value.trim() === "";

const CustomAddressPopup = (props) => {
  const [formInputSValidity, setFormInputsValidity] = useState({
    username: true,
    address: true,
    phone: true,
  });

  const usernameInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const enteredUsernameIsValid = !isEmpty(enteredUsername);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPhoneIsValid = !isEmpty(enteredPhone);

    const formIsValid =
      enteredUsernameIsValid && enteredPhoneIsValid && enteredAddressIsValid;

    setFormInputsValidity({
      username: enteredUsernameIsValid,
      address: enteredAddressIsValid,
      phone: enteredPhoneIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      username: enteredUsername,
      address: enteredAddress,
      phone: enteredPhone,
    });
  };

  const usernameControlClasses = `${classes.control} ${
    formInputSValidity.username ? "" : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInputSValidity.address ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputSValidity.phone ? "" : classes.invalid
  }`;

  const cartModalContent = (
    <Fragment>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={usernameControlClasses}>
          <label htmlFor="username">Tên</label>
          <input type="text" id="username" ref={usernameInputRef} />
          {!formInputSValidity.username && <p>Please enter username</p>}
        </div>

        <div className={addressControlClasses}>
          <label htmlFor="address">Địa Chỉ</label>
          <input type="text" id="address" ref={addressInputRef} />
          {!formInputSValidity.address && <p>Please enter name</p>}
        </div>

        <div className={phoneControlClasses}>
          <label htmlFor="phone">Số Điện Thoại</label>
          <input type="number" id="phone" ref={phoneInputRef} />
          {!formInputSValidity.phone && <p>Please enter name</p>}
        </div>

        <div className={classes.actions}>
          <button className={classes.submit}>Confirm</button>
          <button onClick={props.onHidePopup}>Cancel</button>
        </div>
      </form>
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order Data ...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.action}>
        <button className={classes.button} onClick={props.onHidePopup}>
          Finish
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onHidePopup={props.onHidePopup}>
      {!props.isSubmitting && !props.didSubmit && cartModalContent}
      {props.isSubmitting && isSubmittingModalContent}
      {!props.isSubmitting && props.didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default CustomAddressPopup;
