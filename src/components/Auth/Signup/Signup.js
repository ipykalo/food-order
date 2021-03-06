import { useState, useRef } from "react";
import classes from "../Login/Login.module.css";
import useForm from "../../../hooks/use-form";
import Modal from "../../UI/Modal/Modal";
import { Link, useNavigate } from "react-router-dom";

const validators = {
  email: (state, val) => val?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
  password: (state, val) => val?.length >= 5,
  confirmPassword: (state, val) => state.password.value === val
}

const Signup = () => {
  const inputRefs = [useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  const model = {
    email: { value: '', valid: false, touched: false },
    password: { value: '', valid: false, touched: false },
    confirmPassword: { value: '', valid: false, touched: false }
  }
  const { state, dispatch: dispatchForm } = useForm(model);
  const [submitFormState, setSubmitFormState] = useState({ error: null, success: null });

  const onChangeInput = el => {
    dispatchForm({
      type: 'CHANGE',
      name: el.currentTarget.name,
      value: el.currentTarget.value,
      validator: validators[el.currentTarget.name]
    });
  }

  const onBlurInput = el => {
    dispatchForm({
      type: 'BLUR',
      name: el.currentTarget.name,
      value: el.currentTarget.value,
      validator: () => { }
    });
  }

  const triggerTouched = () => {
    for (let i = 0; i < inputRefs.length; i++) {
      let input = inputRefs[i].current;

      if (!state[input.name].valid) {
        dispatchForm({
          type: 'BLUR',
          name: input.name,
          value: input.value,
          validator: () => { }
        });
      }
    }
  }

  const onSignup = event => {
    event.preventDefault();

    if (state.confirmPassword.value !== state.password.value) {
      dispatchForm({
        type: 'CHANGE',
        name: 'confirmPassword',
        value: state.confirmPassword.value,
        validator: validators['confirmPassword']
      });
      return;
    }
    const isValid = Object.values(state).every(el => el.valid);

    if (!isValid) {
      triggerTouched();
      return
    }

    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        email: state.email.value,
        password: state.password.value,
        confirmPassword: state.confirmPassword.value
      })
    })
      .then(async resp => {
        const parsedResp = await resp.json();

        if (!resp.ok) {
          const error = {
            title: `Error: ${resp.status} - ${resp.statusText}`,
            message: parsedResp.message
          };
          setSubmitFormState({ error, success: null });
          return;
        }
        setSubmitFormState({ error: null, success: { title: 'Success', message: parsedResp.message } });
        setTimeout(() => navigate('/login'), 1000);
      })
      .catch(err => setSubmitFormState({ error: { title: 'Error', message: err.message }, success: null }))
  }

  const isInValid = control => {
    return control.touched && !control.valid;
  }

  const getErrorClass = control => {
    return isInValid(control) ? classes.invalid : '';
  }

  return (
    <>
      <div className={classes.container}>
        <h3>Signup</h3>
        <form className="mt-5" onSubmit={onSignup}>
          <div className={`mb-3 ${getErrorClass(state?.email)}`}>
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              ref={inputRefs[0]}
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
              onChange={onChangeInput}
              onBlur={onBlurInput}
            />
            {isInValid(state?.email) && <p>Please enter valid value.</p>}
          </div>
          <div className={getErrorClass(state?.password)}>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              ref={inputRefs[1]}
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              onChange={onChangeInput}
              onBlur={onBlurInput}
            />
            {isInValid(state?.password) && <p>Password length should not be less then 5 chars.</p>}
          </div>
          <div className={`${getErrorClass(state?.confirmPassword)} mt-3`}>
            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
            <input
              ref={inputRefs[2]}
              type="password"
              id="confirm-password"
              className="form-control"
              placeholder="Confirm your password"
              name="confirmPassword"
              onChange={onChangeInput}
              onBlur={onBlurInput}
            />
            {isInValid(state?.confirmPassword) && <p>Password doesn't match</p>}
          </div>
          <div className={`${classes.link} mt-5`}>
            <button
              type="submit"
              className={classes.login}
              disabled={!state.email.valid || !state.password.valid || !state.confirmPassword.valid}
            >
              Signup
            </button>
            <Link to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
      {(submitFormState.error || submitFormState.success) &&
        <Modal onClickBackdrop={setSubmitFormState.bind(null, false)}>
          <h1>{submitFormState.error ? submitFormState.error.title : submitFormState.success.title}</h1>
          <p className={submitFormState.success ? 'text-success' : 'text-danger'}>
            {submitFormState.error ? submitFormState.error.message : submitFormState.success.message}
          </p>
        </Modal>
      }
    </>
  );
}

export default Signup;