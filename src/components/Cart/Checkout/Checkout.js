import { useReducer } from 'react';
import classes from './Checkout.module.css';

const reducer = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  if (action.type === 'BLUR') {
    newState[action.name].touched = true;
  }

  if (action.type === 'CHANGE') {
    newState[action.name].value = action.value;
    newState[action.name].valid = !!action.value;
  }
  return newState;
}

const Checkout = (props) => {
  const model = {
    name: { value: '', valid: false, touched: false },
    street: { value: '', valid: false, touched: false },
    postal: { value: '', valid: false, touched: false },
    city: { value: '', valid: false, touched: false }
  }
  const [state, dispatch] = useReducer(reducer, model);

  const onChangeInput = el => {
    dispatch({
      type: 'CHANGE',
      name: el.currentTarget.name,
      value: el.currentTarget.value
    });
  }

  const onBlurInput = el => {
    dispatch({
      type: 'BLUR',
      name: el.currentTarget.name,
      value: el.currentTarget.value
    });
  }

  const onSubmit = event => {
    event.preventDefault();
  }

  const getErrorClass = control => {
    return isInValid(control) ? classes.invalid : '';
  }

  const isInValid = control => {
    return control.touched && !control.valid;
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={`${classes.control} ${getErrorClass(state?.name)}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' name='name' onChange={onChangeInput} onBlur={onBlurInput} />
        {isInValid(state?.name) && <p>Please enter valid value.</p>}
      </div>
      <div className={`${classes.control} ${getErrorClass(state?.street)}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' name='street' onChange={onChangeInput} onBlur={onBlurInput} />
        {isInValid(state?.street) && <p>Please enter valid value.</p>}
      </div>
      <div className={`${classes.control} ${getErrorClass(state?.postal)}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' name='postal' onChange={onChangeInput} onBlur={onBlurInput} />
        {isInValid(state?.postal) && <p>Please enter valid value.</p>}
      </div>
      <div className={`${classes.control} ${getErrorClass(state?.city)}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' onChange={onChangeInput} onBlur={onBlurInput} />
        {isInValid(state?.city) && <p>Please enter valid value.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;