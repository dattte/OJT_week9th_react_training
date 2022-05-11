import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  coupon: 5,
  addItem: (item) => {},
  removeItem: (id) => {},
  deleteItem: (id) => {},
  addCoupon: (coupon) => {},
  checkoutCart: () => {},
  changeTopping: (item) => {},
  clearCart: () => {},
});

export default CartContext;
