import { useRef } from "react";

import Input from "../../UI/Input";

import classes from "./List.module.scss";

const ListItemForm = (props) => {
  const amountInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.total} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "10",
          defaultValue: "1",
        }}
      />

      <button>+</button>
    </form>
  );
};

export default ListItemForm;
