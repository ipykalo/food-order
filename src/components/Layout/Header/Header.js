import classes from "./Header.module.css";
import img from "../../../assets/meals.jpg";
import Button from "./Button/Button";

const Header = props => {
  return (
    <>
      <header className={classes.header}>
        <h1>Meals</h1>
        <Button onClickBtn={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={img} alt="meal" />
      </div>
    </>
  );
}

export default Header;