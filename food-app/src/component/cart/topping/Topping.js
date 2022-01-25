import { useContext } from "react";
import CartContext from "../../../store/context/cart-context";
import ToppingItemForm from "./ToppingItemForm";

import classes from "../Cart.module.scss";

const Topping = (props) => {
  const cartCtx = useContext(CartContext);

  const handleAddFoodList = (amount) => {
    cartCtx.changeTopping({ ...props, amount: amount });
  };
  return (
    <div className={classes.topping} key={props.id}>
      <p>{props.name}</p>
      <ToppingItemForm onChangeTopping={handleAddFoodList} />
      <span>* £{props.price}</span>
    </div>
  );
};

export default Topping;
