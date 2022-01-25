import { Fragment, useContext } from "react";

import Modal from "../../UI/Modal";
import CartContext from "../../store/context/cart-context";

import classes from "./OrderPopup.module.scss";

const OrderPopup = (props) => {
  const cartCtx = useContext(CartContext);

  const orderData = cartCtx.items.map((foodItem) => (
    <tr key={foodItem.id} className={classes.item}>
      <td>{foodItem.name}</td>

      <td>£ {foodItem.amount * foodItem.price}</td>
    </tr>
  ));

  const cartModalContent = (
    <form
      className={classes.form}
      onSubmit={() => props.onConfirm(props.loginUser, cartCtx.items)}
    >
      <div className={classes["invoice-box"]}>
        <table>
          <tbody>
            <tr className={classes.information}>
              <td colSpan="2">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <p>ADDRESS: </p>
                        <p>{props.loginUser.address}</p>
                      </td>

                      <td>
                        <p>UserName: {props.loginUser.username}</p>
                        <p>Email: {props.loginUser.email}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className={classes.heading}>
              <td>Payment Method</td>
              <td>Check #</td>
            </tr>

            <tr className={classes.details}>
              <td>Check</td>
              <td>1000</td>
            </tr>

            <tr className={classes.heading}>
              <td>Item</td>
              <td>Price</td>
            </tr>

            {orderData}

            <tr className={classes.heading}>
              <td>COUPON</td>

              <td>{cartCtx.coupon} %</td>
            </tr>

            <tr className={classes.total}>
              <td></td>

              <td>Total: ${cartCtx.totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classes.actions}>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
        <button onClick={props.onHidePopup}>Cancel</button>
      </div>
    </form>
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

export default OrderPopup;
