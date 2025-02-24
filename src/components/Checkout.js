// Checkout.js
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "./CheckoutForm";
import { collection, addDoc, Timestamp, writeBatch, getDocs, query, where, documentId } from "firebase/firestore";
import { db } from "../config/firebase";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");
    const { cartItems, total, clearCart } = useContext(CartContext);

    useEffect(() => {
        console.log("Contenido del carrito:", cartItems);
    }, [cartItems]);

    const createOrder = async ({ name, lastName, phone, email }) => {
        setLoading(true);

        try {
            if (!cartItems || cartItems.length === 0) {
                console.error("El carrito está vacío o no se ha inicializado correctamente.");
                alert("El carrito está vacío o no se ha inicializado correctamente.");
                setLoading(false);
                return;
            }

            // Crear  orden
            const order = {
                buyer: {name, lastName, phone, email},
                items: cartItems,
                total: total,
                date: Timestamp.fromDate(new Date())
            };

            const batch = writeBatch(db); // Batch para actualizar el stock
            const outOfStock = []; // array de productos sin stock

            const ids = cartItems.map(prod => prod.id); // obtiene id de los productos en cartItems 
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
                const productAddedToCart = cartItems.find(prod => prod.id === doc.id); // busca prod del cartItems en db
                const prodQuantity = productAddedToCart?.quantity; // cantidad de prod en cartItems

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
