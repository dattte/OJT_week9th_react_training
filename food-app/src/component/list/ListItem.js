import { useContext } from "react";

import ListItemForm from "./ListItemForm";
import CartContext from "../../store/cart-context";

import classes from "./List.module.scss";

function ListItem(props) {
  const cartCtx = useContext(CartContext);

  const item = cartCtx.items.find((item) => {
    if (item.id === props.id) {
      return item;
    }
  });

  const addToCartHandler = (amount) => {
    props.onSetIsValid(true);
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image,
      topping: props.topping,
    });
  };

  return (
    <div id={props.id} className={classes["list-item"]}>
      <img src={props.image} alt={props.image} />
      {item !== undefined && <p className={classes.amount}>{item?.amount}</p>}
      <ListItemForm onAddToCart={addToCartHandler} />
    </div>
  );
}

export default ListItem;
