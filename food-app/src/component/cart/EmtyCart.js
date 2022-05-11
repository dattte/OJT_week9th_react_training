import classes from "./cart.module.scss";

const EmtyCart = () => {
  return (
    <div className={classes.emty}>
      <h2>YOUR CART IS EMTY</h2>
    </div>
  );
};

export default EmtyCart;
