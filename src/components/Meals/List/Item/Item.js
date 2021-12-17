import classes from "./Item.module.css";
import Form from "./Form/Form";
import { useContext } from "react";
import CratContext from "../../../../context/cart";

const Item = props => {
  const context = useContext(CratContext);

  const onAddToCart = amount => {
    context.onAdd({
      amount,
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price
    });
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{props.price}</p>
      </div>
      <div>
        <Form id={props.id} onAddToCart={onAddToCart} />
      </div>
    </li>
  );
}

export default Item;