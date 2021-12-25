import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import { useContext, useState } from "react";
import CratContext from "../../context/cart";
import Item from "./Item/Item";
import Checkout from "./Checkout/Checkout";
import { useSelector } from "react-redux";

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const ctxCart = useContext(CratContext);

  const tokenData = useSelector(state => state.token.tokenData);

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

  const onSubmitForm = (userInfo) => {
    fetch('http://localhost:4000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.token}`
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

  return (
    <>
      {
        !isSuccessSubmit &&
        <Modal>
          <ul className={classes['cart-items']}>{items}</ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${ctxCart.total}</span>
          </div>
          {isCheckout && <Checkout onCancel={props.onClose} onSubmit={onSubmitForm} />}
          {!isCheckout && <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            <button className={classes.button} onClick={onCheckout} disabled={ctxCart.total === 0}>Order</button>
          </div>}
        </Modal>
      }
      {
        isSuccessSubmit &&
        <Modal onClickBackdrop={props.onClose}>
          <h1>The Order successfuly submited!</h1>
        </Modal>
      }
    </>
  );
}

export default Cart;