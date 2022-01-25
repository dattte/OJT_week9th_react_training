import { useReducer } from "react";

import CartContext from "../context/cart-context";
import cartReducer from "../reducers/cartReducer";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  coupon: 5,
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemToCart = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  const addCouponToCheckout = (coupon) => {
    dispatchCartAction({ type: "COUPON", coupon: coupon });
  };

  const checkoutCart = () => {
    dispatchCartAction({ type: "CHECKOUT" });
  };

  const changeTopping = (item) => {
    dispatchCartAction({ type: "CHANGE", topping: item });
  };

  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    coupon: cartState.coupon,
    addItem: addItemToCart,
    removeItem: removeItemToCart,
    deleteItem: deleteItemToCart,
    addCoupon: addCouponToCheckout,
    checkoutCart: checkoutCart,
    changeTopping: changeTopping,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
