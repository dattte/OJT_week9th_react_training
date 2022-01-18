import classes from "../../App.module.scss";

const EmtyCart = () => {
  return (
    <div className={classes["food-body__emty"]}>
      <h2>YOUR CART IS EMTY</h2>
    </div>
  );
};

export default EmtyCart;
