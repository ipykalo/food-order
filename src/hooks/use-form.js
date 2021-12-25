import { useReducer } from "react";

const reducer = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  if (action.type === 'BLUR') {
    newState[action.name].touched = true;
  }

  if (action.type === 'CHANGE') {
    newState[action.name].value = action.value;
    newState[action.name].valid = action.validator(action.value);
  }
  return newState;
}

const useForm = model => {
  const [state, dispatch] = useReducer(reducer, model);

  return { state, dispatch };
}

export default useForm;