import { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, clearCart, total } = useContext(CartContext);

  //Si el carrito esta vacío redirigimos a comprar
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
      {cartItems.map(item => <CartItem key={item.id} {...item}/> )}
      <div className="total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="button is-danger" onClick={() => clearCart()}>Vaciar Carrito</button>
        <Link to="/checkout" className="button is-primary">Finalizar Compra</Link>
      </div>
    </div>
  );
};

export default Cart;
