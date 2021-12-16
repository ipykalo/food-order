import { Fragment } from "react/cjs/react.production.min";
import classes from "./Header.module.css";
import img from "../../assets/meals.jpg";
import HeaderButton from "./HeaderButton";

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderButton />
      </header>
      <div className={classes['main-image']}>
        <img src={img} alt="meal" />
      </div>
    </Fragment>
  );
}

export default Header;