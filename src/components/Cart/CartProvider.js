import { useReducer } from "react";
import CratContext from "../../context/cart";


const reducer = (state, action) => {
  if (action.type === 'ADD') {
    const items = [].concat(state.items);
    const index = items.findIndex(i => i.id === action.item.id);
    index === -1 && items.push(action.item);

    if (index > -1) {
      items[index].amount += action.item.amount;
    }

    return {
      items,
      total: +(state.total + action.item.amount * action.item.price).toFixed(2)
    }
  } else if (action.type === "REMOVE") {
    const items = state.items.map((el, i, arr) => {
      if (el.id === action.id) {
        if (el.amount > 1) {
          el.amount--
          return el;
        }
        arr.splice(i);
      }
      return el;
    });
    const total = items.reduce((totalValue, el) => {
      return totalValue += el.price * el.amount
    }, 0);

    return {
      items,
      total: +(total).toFixed(2)
    }
  }
}

const CartProvider = props => {
  const [ctxState, dispatchState] = useReducer(reducer, {
    items: [],
    total: 0
  });

  return (
    <CratContext.Provider value={{
      onAdd: item => dispatchState({ item, type: "ADD" }),
      onRemove: id => dispatchState({ id, type: "REMOVE" }),
      items: ctxState.items,
      total: ctxState.total
    }}>
      {props.children}
    </CratContext.Provider>
  );
}

export default CartProvider;