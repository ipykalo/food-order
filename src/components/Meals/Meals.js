import Summary from "./Summary/Summary";
import List from "./List/List";
import { useEffect, useState } from "react";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/meals')
      .then(resp => resp.json())
      .then(meals => setMeals(meals));
  }, []);

  return (
    <>
      <Summary />
      <List list={meals} />
    </>
  );
}

export default Meals;