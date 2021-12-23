import Summary from "./Summary/Summary";
import List from "./List/List";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading/Loading";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:4000/meals')
      .then(resp => resp.json())
      .then(meals => setMeals(meals))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Summary />
      {!isLoading && <List list={meals} />}
      {!isLoading && !meals.length && <p>No meals found.</p>}
      {isLoading && <Loading />}
    </>
  );
}

export default Meals;