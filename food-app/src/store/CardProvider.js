import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  coupon: 5,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CHANGE") {
    let updatedItems;
    updatedItems = [...state.items];
    const parrentItem = updatedItems.find(
      (pi) => pi.id === action.topping.parrentKey
    );
    const toppingItem = parrentItem.topping.find(
      (ic) => ic.id === action.topping.id
    );
    toppingItem.amount = action.topping.amount;

    let icAmount = 0;
    let ipAmount = 0;
    updatedItems.map((ip) => {
      ip.topping.map((ic) => {
        return (icAmount += ic.price * ic.amount);
      });
      return (ipAmount += ip.price * ip.amount);
    });

    const updatedTotalAmount = ipAmount + icAmount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DELETE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);

    let icAmount = 0;
    let ipAmount = 0;
    updatedItems.map((ip) => {
      ip.topping.map((ic) => {
        icAmount += ic.price * ic.amount;
      });
      ipAmount += ip.price * ip.amount;
    });

    const updatedTotalAmount = ipAmount + icAmount;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "COUPON") {
    let updatedItems;
    let updatedTotalAmount;
    let updatedCoupon;
    updatedItems = [...state.items];
    updatedTotalAmount = state.totalAmount;
    updatedCoupon = action.coupon;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      coupon: updatedCoupon,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  if (action.type === "CHECKOUT") {
    let updatedItems;
    let updatedCoupon;
    if (updatedCoupon === undefined) {
      updatedCoupon = 5;
    } else {
      updatedCoupon = state.coupon;
    }
    updatedItems = [...state.items];

    const updatedTotalAmount =
      state.totalAmount - (state.totalAmount * updatedCoupon) / 100;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      coupon: updatedCoupon,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemToCartHandler = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  const addCouponToCheckout = (coupon) => {
    dispatchCartAction({ type: "COUPON", coupon: coupon });
  };

  const checkoutCartHandler = () => {
    dispatchCartAction({ type: "CHECKOUT" });
  };

  const changeToppingHandler = (item) => {
    dispatchCartAction({ type: "CHANGE", topping: item });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    coupon: cartState.coupon,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    deleteItem: deleteItemToCartHandler,
    addCoupon: addCouponToCheckout,
    checkoutCart: checkoutCartHandler,
    changeTopping: changeToppingHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
