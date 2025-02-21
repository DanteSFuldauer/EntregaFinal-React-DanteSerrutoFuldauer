import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className="item">
      <Link to={`/item/${item.id}`}>
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.price}</p>
      </Link>
    </div>
  );
};

export default Item;
