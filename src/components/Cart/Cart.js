import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext, useState, Fragment } from "react";
import CratContext from "../../context/cart";
import Item from "./Item/Item";
import Checkout from "./Checkout/Checkout";

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
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

  const onCheckout = () => {
    setIsCheckout(true);
  }

  const submitForm = (userInfo) => {
    fetch('http://localhost:4000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...userInfo,
        order: ctxCart.items.map(i => ({ meal: i.id, amount: i.amount }))
      })
    })
      .then(() => {
        ctxCart.onClear();
        setIsSuccessSubmit(true);
      });
  }

  const cartContent = <Fragment>
    <ul className={classes['cart-items']}>{items}</ul>
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>${ctxCart.total}</span>
    </div>
    {isCheckout && <Checkout onCancel={props.onClose} onSubmit={submitForm} />}
    {!isCheckout && <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      <button className={classes.button} onClick={onCheckout} disabled={ctxCart.total === 0}>Order</button>
    </div>}
  </Fragment>

  return (
    <Modal onClickBackdrop={props.onClose}>
      {!isSuccessSubmit && cartContent}
      {isSuccessSubmit && <h1>The Order successfuly submited!</h1>}
    </Modal>
  );
}

export default Cart;