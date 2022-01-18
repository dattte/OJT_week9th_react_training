import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Payment.module.scss";

const Payment = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const addCouponToCheckout = (coupon) => {
    cartCtx.addCoupon(coupon.target.value);
  };

  const checkoutHandler = () => {
    cartCtx.checkoutCart();
  };

  const hasItem = cartCtx.items.length > 0;

  const getData = () => {
    const value = document.getElementsByName("address")[1].checked;
    console.log(value);
  };

  return (
    <div className={classes.payment}>
      <div className={classes["payment-info"]}>
        <div className={classes["payment-info__delivery"]}>
          <h2>DELIVERY ADDRESS</h2>
          <p>{props.loginUser.address}</p>
        </div>
        <div className={classes["payment-info__card"]}>
          <h2>PAYMENT CARD NUMBER</h2>
          <p>****************1231</p>
        </div>
      </div>

      <div className={classes["payment-coupon"]}>
        <h2>APPLY COUPON</h2>
        <select name="coupon" id="coupon" onChange={addCouponToCheckout}>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
        </select>

        <input type="radio" name="address" value="default" defaultChecked />
        <label htmlFor="default">default</label>
        <input
          type="radio"
          name="address"
          onClick={props.onShowCustomAddressPopup}
          value="custom"
        />
        <label htmlFor="custom">custom</label>
      </div>

      <div className={classes["payment-checkout"]}>
        <button
          disabled={!hasItem}
          className={`${classes.btn} ${classes["btn-checkout"]}`}
          onClick={checkoutHandler}
        >
          Checkout
        </button>

        <p>{totalAmount}</p>
        <button
          disabled={!hasItem}
          onClick={props.onShowOrderPopup}
          className={`${classes.btn} ${classes["btn-checkout"]}`}
        >
          Order
        </button>

        <button onClick={getData}>Click</button>
      </div>
    </div>
  );
};

export default Payment;
