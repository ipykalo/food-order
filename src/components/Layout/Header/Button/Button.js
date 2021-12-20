import { useContext, useEffect, useState } from "react";
import Icon from "./Icon/Icon";
import classes from "./Button.module.css";
import CratContext from "../../../../context/cart";

const Button = props => {
  const [isBump, setIsBump] = useState(false);
  const cart = useContext(CratContext);

  useEffect(() => {
    setIsBump(true);
    const id = setTimeout(() => setIsBump(false), 300);

    return () => clearTimeout(id);
  }, [cart.items]);

  return (
    <button className={`${classes.button} ${isBump ? classes.bump : ''}`} onClick={props.onClickBtn}>
      <span className={classes.icon}><Icon /></span>
      <span>Cart</span>
      <span className={classes.badge}>{cart.total}</span>
    </button>
  );
}

export default Button;