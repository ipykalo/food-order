import { useReducer } from "react";
import CratContext from "../../context/cart";

const add = (state, action) => {
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
}

const remove = (state, action) => {
  const items = [...state.items];
  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (item.id === action.id) {
      if (item.amount > 1) {
        item.amount--;
        break;
      }
      items.splice(i, 1);
      break;
    }
  }
  const total = items.reduce((totalValue, el) => {
    return totalValue += el.price * el.amount
  }, 0);

  return {
    items,
    total: +(total).toFixed(2)
  }
}

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return add(state, action);
  } else if (action.type === "REMOVE") {
    return remove(state, action);
  } else if (action.type === "CLEAR") {
    return {
      items: [],
      total: 0
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
      onClear: () => dispatchState({ type: "CLEAR" }),
      items: ctxState.items,
      total: ctxState.total
    }}>
      {props.children}
    </CratContext.Provider>
  );
}

export default CartProvider;