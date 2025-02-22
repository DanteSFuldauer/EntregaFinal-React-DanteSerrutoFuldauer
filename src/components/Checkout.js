import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
<<<<<<< HEAD
import CheckoutForm from "./CheckoutForm";
import { collection, addDoc, Timestamp, writeBatch, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../config/firebase";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");

    const { cart, total, clearCart } = useContext(CartContext);

    const createOrder = async ({ name, lastName, phone, email }) => {
        setLoading(true);

        try {
            // Crear  orden
            const order = {
                buyer: {name, lastName, phone, email},
                items: cart,
                total: total,
                date: Timestamp.fromDate(new Date())
            };

            const batch = writeBatch(db); // Batch para actualizar el stock
            const outOfStock = []; // array de productos sin stock

            const ids = cart.map(prod => prod.id); // obtiene id de los productos en cart 
            const productsRef = collection(db, "products"); // referencias a los productos en Firestore

            // Obtiene productos del carrito en firestore
            const productsAddedFromFirestore = await getDocs(
                query(productsRef, where(documentId(), "in", ids))
            );

            const { docs } = productsAddedFromFirestore;

            // Verificar disponibilidad de stock
            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock; // stock de cada producto
                const productAddedToCart = cart.find(prod => prod.id === doc.id); // busca prod del cart en db
                const prodQuantity = productAddedToCart?.quantity; // cantidad de prod en cart

                if (stockDb >= prodQuantity) { // si hay stock, actualizo la db
                    batch.update(doc.ref, { stock: stockDb - prodQuantity }); 
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc }); // sino se agrega a la lista sinStock
                }
            });

            if (outOfStock.length === 0) { // Si todos los prod tienen stock
              
                await batch.commit(); // Actualizar stock en Firestore

                const orderRef = collection(db, "orders");
                const orderAdded = await addDoc(orderRef, order); //agrega orden a coleccion ordenes

                setOrderId(orderAdded.id); // Guardar ID de la orden
                clearCart(); // Vaciar carrito
            } else {
                console.error("Hay productos que están fuera de stock:", outOfStock);
                alert("Algunos productos están fuera de stock. Por favor, revisa tu carrito.");
            }
        } catch (error) {
            console.error("Error al generar la orden:", error);
        } finally {
            setLoading(false); // Finalizar proceso de carga
        }
    };

    if (loading) {
        return <h1 className="text is-size-3">Se está generando la orden...</h1>;
    }
    if (orderId) {
        return (
            <div>
                <h1 className="text is-size-3">Orden generada con éxito!!</h1>
                <article className="message is-success my-5">
                    <div className="message-header">
                        <p>ID de su orden:</p>
                    </div>
                    <div className="message-body">
                        {orderId}
                    </div>
                </article>
            </div>
        )
    }
    return (
        <div>
            <h1 className="text is-size-1">Checkout</h1>
            <CheckoutForm onConfirm={createOrder} />
        </div>
    );
};

export default Checkout;
=======
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert("Los emails no coinciden");
      return;
    }

    const order = {
      buyer: { name, lastName, phone, email },
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: Timestamp.fromDate(new Date())
    };

    try {
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
>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
