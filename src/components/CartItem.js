import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} style={{ width: "50px" }} />
      <h4>{item.name}</h4>
      <p>Cantidad: {item.quantity}</p>
      <p>Precio: ${item.price}</p>
      <button onClick={() => removeItem(item.id)}>Eliminar</button>
    </div>
  );
};

export default CartItem;
