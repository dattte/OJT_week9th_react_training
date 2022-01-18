const ToppingItemForm = (props) => {
  const changeHandler = (event) => {
    const enteredAmount = event.target.value;
    const enteredAmountNumber = +enteredAmount;
    props.onChangeTopping(enteredAmountNumber);
  };
  return <input type="number" min="1" max="10" onChange={changeHandler} />;
};

export default ToppingItemForm;
