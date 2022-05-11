import data from "../../assets/data";

import ListItem from "./ListItem";

import classes from "./list.module.scss";

function List(props) {
  const foodList = data.map((foodItem) => (
    <ListItem
      key={foodItem.id}
      id={foodItem.id}
      name={foodItem.name}
      price={foodItem.price}
      amount={foodItem.amount}
      image={foodItem.image}
      topping={foodItem.topping}
      onSetIsValid={props.onSetIsValid}
    />
  ));

  return <div className={`${classes.list} scrollbar`}>{foodList}</div>;
}

export default List;
