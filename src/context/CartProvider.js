import { useReducer } from "react";
import CratContext from "./cart";

const CartProvider = props => {
  const reducer = (state, action) => {
    if (action.type === 'ADD') {
      return {
        items: state.items.concat(action.item),
        total: +(state.total + action.item.amount * action.item.price).toFixed(2)
      }
    } else if (action.type === "REMOVE") {
      //TODO implemet
    }
  }

  const [ctxState, dispatch] = useReducer(reducer, {
    items: [],
    total: 0
  });

  const addItem = item => {
    item && dispatch({ item, type: "ADD" });
  }

  const removeItem = id => {
    id && dispatch({ id, type: "ADD" });
  }

  return (
    <CratContext.Provider value={{
      items: ctxState.items,
      total: ctxState.total,
      addItem,
      removeItem
    }}>
      {props.children}
    </CratContext.Provider>
  );
}

export default CartProvider;