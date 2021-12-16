import { Fragment } from "react/cjs/react.production.min";
import Summary from "./Summary/Summary";
import List from "./List/List";

const Meals = () => {
  return (
    <Fragment>
      <Summary />
      <List />
    </Fragment>
  );
}

export default Meals;