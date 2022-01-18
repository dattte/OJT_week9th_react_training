import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import ToppingItemForm from "./ToppingItemForm";

import classes from "../Cart.module.scss";

const Topping = (props) => {
  const cartCtx = useContext(CartContext);

  const addFoodListHandler = (amount) => {
    cartCtx.changeTopping({ ...props, amount: amount });
  };
  return (
    <div className={classes.topping} key={props.id}>
      {props.name}
      <ToppingItemForm onChangeTopping={addFoodListHandler} />* ${props.price}
    </div>
  );
};

export default Topping;
