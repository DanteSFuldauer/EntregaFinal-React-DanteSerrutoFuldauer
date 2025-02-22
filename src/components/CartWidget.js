import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartWidget = () => {
  //importado de total de items en el carro
  const { totalQuantity } = useContext(CartContext);

  return (
      <div className="has-text-link">
          <Link to="/cart" style={{ display: totalQuantity > 0 ? "block" : "none" }}>
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {totalQuantity}
          </Link>
      </div>
  );
};

export default CartWidget; 
  