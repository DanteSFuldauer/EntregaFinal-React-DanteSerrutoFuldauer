<<<<<<< HEAD
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
=======
const CartWidget = ({ cartCount }) => {
    return (
      <div className="cart-widget">
        <span>🛒</span>
        <span>{cartCount}</span>
      </div>
    );
  };
  
  export default CartWidget;
>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
  