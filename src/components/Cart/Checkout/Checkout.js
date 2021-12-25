import { useRef } from 'react';
import useForm from '../../../hooks/use-form';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const model = {
    name: { value: '', valid: false, touched: false },
    street: { value: '', valid: false, touched: false },
    postal: { value: '', valid: false, touched: false },
    city: { value: '', valid: false, touched: false }
  }
  const {state, dispatch} = useForm(model);

  const onChangeInput = el => {
    dispatch({
      type: 'CHANGE',
      name: el.currentTarget.name,
      value: el.currentTarget.value,
      validator: (state, val) => !!val.trim()
    });
  }

  const onBlurInput = el => {
    dispatch({
      type: 'BLUR',
      name: el.currentTarget.name,
      value: el.currentTarget.value,
      validator: () => { }
    });
  }

  const getErrorClass = control => {
    return isInValid(control) ? classes.invalid : '';
  }

  const isInValid = control => {
    return control.touched && !control.valid;
  }

  const triggerTouched = () => {
    for (let i = 0; i < inputRefs.length; i++) {
      let input = inputRefs[i].current;

      if (!state[input.name].valid) {
        dispatch({
          type: 'BLUR',
          name: input.name,
          value: input.value
        });
      }
    }
  }

  const onSubmit = event => {
    event.preventDefault();
    const isValid = Object.values(state).every(el => el.valid);

    if (!isValid) {
      triggerTouched();
      return
    }
    props.onSubmit({
      name: state.name.value,
      street: state.street.value,
      postal: state.postal.value,
      city: state.city.value
    });
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={`${classes.control} ${getErrorClass(state?.name)}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' name='name' onChange={onChangeInput} onBlur={onBlurInput} ref={inputRefs[0]} />
        {isInValid(state?.name) && <p>Please enter valid value.</p>}
      </div>
      <div className={`${classes.control} ${getErrorClass(state?.street)}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' name='street' onChange={onChangeInput} onBlur={onBlurInput} ref={inputRefs[1]} />
        {isInValid(state?.street) && <p>Please enter valid value.</p>}
      </div>
      <div className={`${classes.control} ${getErrorClass(state?.postal)}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' name='postal' onChange={onChangeInput} onBlur={onBlurInput} ref={inputRefs[2]} />
        {isInValid(state?.postal) && <p>Please enter valid value.</p>}
      </div>
      <div className={`${classes.control} ${getErrorClass(state?.city)}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' onChange={onChangeInput} onBlur={onBlurInput} ref={inputRefs[3]} />
        {isInValid(state?.city) && <p>Please enter valid value.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;