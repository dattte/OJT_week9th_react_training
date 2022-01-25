import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthStatus from "../login/auth/AuthStatus";

import Cart from "../cart/Cart";
import CartContext from "../../store/context/cart-context";
import List from "../list/List";
import Payment from "../payment/Payment";
import EmtyCart from "../cart/EmtyCart";
import CustomAddressPopup from "../payment/CustomAddressPopup";
import OrderPopup from "../payment/OrderPopup";

import data from "../../assets/data";
import classes from "./menu.module.scss";

function Menu(props) {
  const cartCtx = useContext(CartContext);

  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState(props.loginUser);
  const [popupIsShown, setPopupIsShown] = useState(false);
  const [orderPopupIsShown, setOrderPopupIsShown] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const showCustomAddress = () => {
    setPopupIsShown(true);
  };

  const hideCustomAddress = () => {
    setPopupIsShown(false);
  };

  const showOrderPopup = () => {
    setOrderPopupIsShown(true);
  };

  const hideOrderPopup = () => {
    setOrderPopupIsShown(false);
    setIsSubmitting(false);

    setIsSubmitting(false);
    setDidSubmit(false);
  };

  function handleSwitch(value) {
    setIsValid(value);
  }

  const submitCustomAddress = async (customAddress) => {
    await setUserData({ ...userData, address: customAddress.address });

    hideCustomAddress();
  };

  const submitOrderPopup = async (userData, cartData) => {
    setIsSubmitting(true);

    // add order address data to back-end
    await console.log(userData, cartData);

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  return (
    <div className={classes.menu}>
      <ul className={classes["menu-nav"]}>
        <li>
          <AuthStatus></AuthStatus>
        </li>

        <li>
          <Link to="/#">
            <img src="images/Logo-full-black.png" alt="logo" />
          </Link>
        </li>

        <li>
          <Link to="/">
            <img src="images/basket2.png" alt="cart" />
          </Link>
        </li>
      </ul>

      {popupIsShown && (
        <CustomAddressPopup
          isSubmitting={isSubmitting}
          didSubmit={didSubmit}
          onConfirm={submitCustomAddress}
          onHidePopup={hideCustomAddress}
        />
      )}

      {orderPopupIsShown && (
        <OrderPopup
          loginUser={userData}
          isSubmitting={isSubmitting}
          didSubmit={didSubmit}
          onConfirm={submitOrderPopup}
          onHidePopup={hideOrderPopup}
        />
      )}

      <div className={classes["food-body"]}>
        <div className={classes["food-body__list"]}>
          <h2>FOOD LIST: {data.length} products</h2>
          <List onSetIsValid={handleSwitch} />
        </div>

        <div className={classes["food-body__cart"]}>
          <h2>YOUR CART</h2>
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
              <Cart onSetIsInvalid={handleSwitch} />
            </div>

            <div
              className={`${classes["cart-payment"]} ${
                cartCtx.items.length === 0 ? `${classes["-invalid"]}` : ""
              }`}
            >
              <Payment
                loginUser={userData}
                onSetDefaultAddress={submitCustomAddress}
                onShowOrderPopup={showOrderPopup}
                onShowCustomAddressPopup={showCustomAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
