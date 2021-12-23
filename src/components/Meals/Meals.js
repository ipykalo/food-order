import Summary from "./Summary/Summary";
import List from "./List/List";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading/Loading";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch('http://localhost:4000/meals');
        const meals = await resp.json();
        setMeals(meals);
        setIsError(false);
      } catch (err) {
        setIsError(true);
      }
      setIsLoading(false)
    }
    fetchData();
  }, []);

  return (
    <>
      <Summary />
      {!isLoading && meals.length && <List list={meals} />}
      {!isLoading && !isError && !meals.length && <p>No meals found.</p>}
      {!isLoading && isError && <h3>Failed to load.</h3>}
      {isLoading && <Loading />}
    </>
  );
}

export default Meals;