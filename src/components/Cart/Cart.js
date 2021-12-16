import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";

const CARTS = [
  { id: 'c1', name: 'Sushi', amount: 2, price: '13.88' },
  { id: 'c2', name: 'Pasta', amount: 1, price: '8.06' }
];

const Cart = props => {
  const items = CARTS.map(item => <li>{item.name}</li>);

  return (
    <Modal>
      <ul className={classes['cart-items']}>{items}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>55.66</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}

export default Cart;