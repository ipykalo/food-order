import { useDispatch } from "react-redux";
import { useState } from "react";
import classes from "./Login.module.css";
import { setToken } from "../../../reducers/token";
import useForm from "../../../hooks/use-form";
import Modal from "../../UI/Modal/Modal";
import { Link } from "react-router-dom";

const Login = () => {
  const model = {
    email: { value: '', valid: false, touched: false },
    password: { value: '', valid: false, touched: false }
  }
  const { state, dispatch: dispatchForm } = useForm(model);
  const dispatch = useDispatch();

  const [submitFormState, setSubmitFormState] = useState({ error: null, success: null });

  const onChangeInput = el => {
    const validators = {
      email: (state, val) => val?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
      password: (state, val) => val?.length >= 5
    }
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

  const onLogin = event => {
    event.preventDefault();

    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        email: state.email.value,
        password: state.password.value
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
        setTimeout(() => dispatch(setToken(parsedResp.token)), 1000);
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
        <h3>Login</h3>
        <form className="mt-5" onSubmit={onLogin}>
          <div className={`mb-3 ${getErrorClass(state?.email)}`}>
            <label htmlFor="email" className="form-label">Email address</label>
            <input
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
          <div className={`${classes.link} mt-5`}>
            <button
              type="submit"
              className={classes.login}
              disabled={!state.email.valid || !state.password.valid}
            >
              Login
            </button>
            <Link to={'/signup'}>Signup</Link>
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

export default Login;