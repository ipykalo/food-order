import classes from "./Item.module.css";

const Item = props => {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.description}</p>
        <p className={classes.price}>{props.price}</p>
      </div>
      <div></div>
    </li>
  );
}

export default Item;