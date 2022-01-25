import { useContext, Fragment } from "react";

import CartContext from "../../store/context/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const handlerAddFoodList = (item) => {
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
      onAdd={handlerAddFoodList.bind(null, foodItem)}
    />
  ));

  return <Fragment>{foodCartData}</Fragment>;
}

export default Cart;
