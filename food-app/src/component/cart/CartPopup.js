import React from "react";
import Modal from "../../UI/Modal";

import classes from "./cartPopup.module.scss";

const CartPopup = (props) => {
  return (
    <Modal onHidePopup={props.onHideCartPopup}>
      <div className={classes.actions}>
        <h2>Do you want to delete this meal ?</h2>
        <button className={classes.submit} onClick={props.onConfirm}>
          Confirm
        </button>
        <button onClick={props.onHideCartPopup}>Cancel</button>
      </div>
    </Modal>
  );
};

export default CartPopup;
