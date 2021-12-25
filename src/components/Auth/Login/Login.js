import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const Login = props => {
  const navigate = useNavigate();

  const onLogin = event => {
    event.preventDefault();
    //navigate("/")
  }

  return (
    <div className={classes.container}>
      <h3>Login</h3>
      <form className="mt-5" onSubmit={onLogin}>
        <div class="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="name@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter your password" />
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;