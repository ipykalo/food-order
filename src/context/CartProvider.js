import { useReducer } from "react";
import CratContext from "./cart";

const reducer = (state, action) => {
  console.log('reducer');
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
  }
}

const CartProvider = props => {
  console.log('CartProvider')
  const [ctxState, dispatch] = useReducer(reducer, {
    items: [],
    total: 0
  });

  const onAddItem = item => {
    console.log(item, 'CartProvider => onAdd');
    dispatch({ item, type: "ADD" });
  }

  const onRemoveItem = id => {
    dispatch({ id, type: "REMOVE" });
  }

  return (
    <CratContext.Provider value={{
      onAdd: onAddItem,
      onRemove: onRemoveItem,
      items: ctxState.items,
      total: ctxState.total
    }}>
      {props.children}
    </CratContext.Provider>
  );
}

export default CartProvider;