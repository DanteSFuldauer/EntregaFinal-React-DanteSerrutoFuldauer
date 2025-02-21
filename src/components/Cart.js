import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="button is-primary">Ir a comprar</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Tu Carrito</h2>
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="button is-danger" onClick={clearCart}>Vaciar Carrito</button>
        <Link to="/checkout" className="button is-primary">Finalizar Compra</Link>
      </div>
    </div>
  );
};

export default Cart;
