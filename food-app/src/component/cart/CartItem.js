import { Fragment, useState, useContext } from "react";

import Topping from "./topping/Topping";
import CartPopup from "../cart/CartPopup";
import CartContext from "../../store/context/cart-context";

import classes from "./cart.module.scss";

function CartItem(props) {
  const price = ` £ ${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const [cartPopupIsShown, setCartPopupIsShown] = useState(false);

  const handleShowCartPopup = () => {
    setCartPopupIsShown(true);
  };

  const handleHideCartPopup = () => {
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

  const handleDeleteFoodList = () => {
    handleShowCartPopup();
  };

  const handleRemoveFoodList = (id) => {
    const remainedItem = cartCtx.items.find((item) => item.id === id);
    if (remainedItem.amount === 1) {
      handleShowCartPopup();
    } else {
      cartCtx.removeItem(id);
    }
  };

  const handleConfirm = (id) => {
    cartCtx.removeItem(id);
    if (cartCtx.items.length === 1) {
      props.onSetIsInvalid(false);
    }
  };

  return (
    <Fragment>
      {cartPopupIsShown && (
        <CartPopup
          onConfirm={handleConfirm.bind(null, props.id)}
          onHideCartPopup={handleHideCartPopup}
        />
      )}
      <div id={props.id} className={classes["cart-item"]}>
        <div className={classes["cart-item_image"]}>
          <img src={props.image} alt={props.image} />
        </div>
        <div className={classes["cart-item_price"]}>
          <table>
            <tbody>
              <tr className={classes.heading}>
                <td>
                  <h3>{props.name}</h3>
                </td>
                <td>
                  <div className={classes.action}>
                    <button
                      className={`${classes.btn} ${classes["btn-minus"]}`}
                      onClick={handleRemoveFoodList.bind(null, props.id)}
                    >
                      -
                    </button>
                    <span className={classes.amount}>
                      x {props.amount} * {price}
                    </span>
                    <button
                      className={`${classes.btn} ${classes["btn-plus"]}`}
                      onClick={props.onAdd}
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>{foodToppingData}</td>
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <button
                    className={`${classes.btn} ${classes["btn-trash"]} ${classes.trash}`}
                    onClick={handleDeleteFoodList.bind(null, props.id)}
                  >
                    <img src="images/trash.png" alt="trash" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default CartItem;
