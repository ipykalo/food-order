import classes from "./Header.module.css";
import img from "../../../assets/meals.jpg";
import Button from "./Button/Button";
import { removeToken } from "../../../reducers/token";
import { useDispatch, useSelector } from "react-redux";

const Header = props => {
  const token = useSelector(state => state.token.tokenData.token);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(removeToken());
  }

  return (
    <>
      <header className={classes.header}>
        <h1>Meals</h1>
        <div className={classes.buttons}>
          <Button onClickBtn={props.onShowCart} />
          {token && <button type="button" className="btn btn-dark" onClick={onLogout}>Logout</button>}
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={img} alt="meal" />
      </div>
    </>
  );
}

export default Header;