import { Fragment, useState, useContext } from "react";

import Topping from "./topping/Topping";
import CartPopup from "../cart/CartPopup";
import CartContext from "../../store/cart-context";

import classes from "./Cart.module.scss";

function CartItem(props) {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const [cartPopupIsShown, setCartPopupIsShown] = useState(false);

  const showCartPopupHandler = () => {
    setCartPopupIsShown(true);
  };

  const hideCartPopupHandler = () => {
    setCartPopupIsShown(false);
  };

  const foodToppingData = props.topping.map((foodItem) => (
    <Topping
      key={foodItem.id}
      id={foodItem.id}
      name={foodItem.name}
      price={foodItem.price}
      parrentKey={props.id}
    />
  ));

  const removeFoodListHandler = (id) => {
    const remainItem = cartCtx.items.find((item) => item.id === id);
    if (remainItem.amount === 1) {
      showCartPopupHandler();
    } else cartCtx.removeItem(id);
  };

  const confirmHandler = (id) => {
    cartCtx.removeItem(id);
    if (cartCtx.items.length === 1) {
      props.onSetIsInvalid(false);
    }
  };

  return (
    <Fragment>
      {cartPopupIsShown && (
        <CartPopup
          onConfirm={confirmHandler.bind(null, props.id)}
          onHideCartPopup={hideCartPopupHandler}
        />
      )}
      <div id={props.id} className={classes["cart-item"]}>
        <div className={classes["cart-item_image"]}>
          <img src={props.image} alt={props.image} />
        </div>
        <div className={classes["cart-item_price"]}>
          <h3>{props.name}</h3>
          {foodToppingData}
          <div className={classes.action}>
            <button
              className={`${classes.btn} ${classes["btn-minus"]}`}
              onClick={removeFoodListHandler.bind(null, props.id)}
            >
              -
            </button>
            <span className={classes.amount}>
              x {props.amount}*{price}
            </span>
            <button
              className={`${classes.btn} ${classes["btn-plus"]}`}
              onClick={props.onAdd}
            >
              +
            </button>
          </div>
          <button
            className={`${classes.btn} ${classes["btn-trash"]} ${classes.trash}`}
            onClick={props.onDelete}
          >
            <img src="images/trash.png" alt="trash" />
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default CartItem;
