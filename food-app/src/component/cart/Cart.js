import { useContext, Fragment } from "react";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const deleteFoodListHandler = (id) => {
    cartCtx.deleteItem(id);

    if (cartCtx.items.length === 1) {
      props.onSetIsInvalid(false);
    }
  };

  const addFoodListHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const foodCartData = cartCtx.items.map((foodItem) => (
    <CartItem
      key={foodItem.id}
      id={foodItem.id}
      name={foodItem.name}
      image={foodItem.image}
      amount={foodItem.amount}
      price={foodItem.price}
      topping={foodItem.topping}
      onSetIsInvalid={props.onSetIsInvalid}
      onDelete={deleteFoodListHandler.bind(null, foodItem.id)}
      onAdd={addFoodListHandler.bind(null, foodItem)}
    />
  ));

  return <Fragment>{foodCartData}</Fragment>;
}

export default Cart;
