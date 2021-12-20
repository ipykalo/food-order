import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext } from "react";
import CratContext from "../../context/cart";
import Item from "./Item/Item";

const Cart = props => {
  const ctxCart = useContext(CratContext);

  const onRemove = id => {
    ctxCart.onRemove(id);
  }

  const onAdd = item => {
    ctxCart.onAdd({ ...item, amount: 1 });
  }

  const items = ctxCart.items.map(item => {
    return (
      <Item
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        summary={item.summary}
        item={item}
        onRemove={onRemove.bind(null, item.id)}
        onAdd={onAdd.bind(null, item)}
      >
      </Item>
    );
  });

  return (
    <Modal onClickBackdrop={props.onClose}>
      <ul className={classes['cart-items']}>{items}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${ctxCart.total}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;