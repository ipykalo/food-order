import classes from "./Form.module.css";
import Input from "../../../../UI/Input/Input";
import { useRef, useState } from "react";

const Form = props => {
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef();

  const onAddToCart = event => {
    event.preventDefault();
    const value = +inputRef.current.value;

    if (isNaN(value) || value < 1 || value > 5) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    props.onAddToCart(value);
  }

  return (
    <form onSubmit={onAddToCart}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1"
        }}
      />
      {isInvalid && <p>Please enter valid amount(1-5)</p>}
      <button type="submit">+ Add</button>
    </form>
  );
}

export default Form;