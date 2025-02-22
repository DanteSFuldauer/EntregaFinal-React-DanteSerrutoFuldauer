import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "./CheckoutForm";
import { collection, addDoc, Timestamp, doc, writeBatch, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../config/firebase";

const Checkout = () => {

  //Almacenar la información del comprador y el ID de la orden creada
  const { cartItems, clearCart, total } = useContext(CartContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Checkeo de email
    if (email !== confirmEmail) {
      alert("Los emails no coinciden");
      return;
    }

    //Objeto orden con info, ítems, total y fecha
    const order = {
      buyer: { name, lastName, phone, email },
      items: cartItems,
      total: total,
      date: Timestamp.fromDate(new Date())
    };

    
    try { //Intento agregar la orden a la coleccion orders
      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden: ", error);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {orderId ? (
        <div>
          <h3>Gracias por tu compra!</h3>
          <p>Tu número de orden es: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Apellido</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Teléfono</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirmar Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-primary">
              Realizar Compra
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
