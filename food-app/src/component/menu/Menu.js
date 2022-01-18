import React, { useState, useContext } from "react";

import Cart from "../cart/Cart";
import CartContext from "../../store/cart-context";
import List from "../list/List";
import Payment from "../payment/Payment";
import EmtyCart from "../cart/EmtyCart";
import CustomAddressPopup from "../payment/CustomAddressPopup";
import OrderPopup from "../payment/OrderPopup";

import classes from "./Menu.module.scss";

function Menu(props) {
  const cartCtx = useContext(CartContext);

  const [isValid, setIsValid] = useState(false);
  const [popupIsShown, setPopupIsShown] = useState(false);
  const [orderPopupIsShown, setOrderPopupIsShown] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const showCustomAddressHandler = () => {
    setPopupIsShown(true);
  };

  const hideCustomAddressHandler = () => {
    setPopupIsShown(false);
  };

  const showOrderPopupHandler = () => {
    setOrderPopupIsShown(true);
  };

  const hideOrderPopupHandler = () => {
    setOrderPopupIsShown(false);
  };

  function switchHandler(value) {
    setIsValid(value);
  }

  const submitCustomAddressHandler = async (customAddress) => {
    await console.log(customAddress, props.loginUser);

    hideCustomAddressHandler();
  };

  const submitOrderPopupHandler = async (userData, cartData) => {
    setIsSubmitting(true);

    // add order address data to back-end
    await console.log(userData, cartData);

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
    hideOrderPopupHandler();
  };

  return (
    <div className={classes.menu}>
      {popupIsShown && (
        <CustomAddressPopup
          isSubmitting={isSubmitting}
          didSubmit={didSubmit}
          onConfirm={submitCustomAddressHandler}
          onHidePopup={hideCustomAddressHandler}
        />
      )}

      {orderPopupIsShown && (
        <OrderPopup
          loginUser={props.loginUser}
          isSubmitting={isSubmitting}
          didSubmit={didSubmit}
          onConfirm={submitOrderPopupHandler}
          onHidePopup={hideOrderPopupHandler}
        />
      )}

      <div className={classes["food-body"]}>
        <div className={classes["food-body__list"]}>
          <h2>Food List</h2>
          <List onSetIsValid={switchHandler} />
        </div>

        <div className={classes["food-body__cart"]}>
          <h2>Your Cart</h2>
          <div className={classes["cart"]}>
            <div
              className={`${classes["cart-list"]} ${
                isValid ? `${classes["-invalid"]}` : ""
              }`}
            >
              <EmtyCart />
            </div>

            <div
              className={`${classes["cart-list"]} scrollbar ${
                !isValid ? `${classes["-invalid"]}` : ""
              }`}
            >
              <Cart onSetIsInvalid={switchHandler} />
            </div>

            <div className={classes["cart-payment"]}>
              <Payment
                loginUser={props.loginUser}
                onShowOrderPopup={showOrderPopupHandler}
                onShowCustomAddressPopup={showCustomAddressHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
