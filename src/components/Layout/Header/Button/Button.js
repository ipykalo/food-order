import { useContext } from "react";
import Icon from "./Icon/Icon";
import classes from "./Button.module.css";
import CratContext from "../../../../context/cart";

const Button = props => {
  const cart = useContext(CratContext);

  return (
    <button className={classes.button} onClick={props.onClickBtn}>
      <span className={classes.icon}><Icon /></span>
      <span>Cart</span>
      <span className={classes.badge}>{cart.total}</span>
    </button>
  );
}

export default Button;