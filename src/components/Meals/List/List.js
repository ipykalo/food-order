import classes from "./List.module.css";
import Wrapper from "../../UI/Wrapper";
import Item from "./Item/Item";

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const List = () => {
  const list = DUMMY_MEALS.map(item => (
    <Item
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
    >
    </Item>
  ));

  return (
    <section className={classes.meals}>
      <Wrapper>
        <ul>{list}</ul>
      </Wrapper>
    </section>
  );
}

export default List;