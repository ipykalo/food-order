import Icon from "./Icon/Icon";
import classes from "./Button.module.css";

const Button = props => {
  return (
    <button className={classes.button} onClick={props.onClickBtn}>
      <span className={classes.icon}><Icon /></span>
      <span>Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
}

export default Button;