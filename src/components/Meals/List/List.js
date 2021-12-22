import classes from "./List.module.css";
import Wrapper from "../../UI/Wrapper/Wrapper";
import Item from "./Item/Item";

const List = props => {
  const list = props.list.map(item => (
    <Item
      key={item.id}
      id={item.id}
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