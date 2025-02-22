import { useContext } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import CartItem from "./CartItem";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, clearCart, total } = useContext(CartContext);

  //Si el carrito esta vacío redirigimos a comprar
=======
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
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
<<<<<<< HEAD
      {cartItems.map(item => <CartItem key={item.id} item={item}/> )}
      <div className="total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="button is-danger" onClick={() => clearCart()}>Vaciar Carrito</button>
=======
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="total">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="button is-danger" onClick={clearCart}>Vaciar Carrito</button>
>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
        <Link to="/checkout" className="button is-primary">Finalizar Compra</Link>
      </div>
    </div>
  );
};

export default Cart;
