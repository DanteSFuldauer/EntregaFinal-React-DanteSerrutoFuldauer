import { createContext, useState } from "react";

// Contexto que inicializa un carrito vacío
export const CartContext = createContext({
  cartItems: []
});

// Proveedor de datos y funciones a los hijos
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función de agregado de items
  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) { // Si no está en el carrito se agrega con la cantidad pedida
      setCartItems(prev => [...prev, { ...item, quantity }]);
    } else { // Sino se actualiza la cantidad
      setCartItems(prev => 
        prev.map(prod => 
          prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod
        )
      );
    }
  };

  // Función de eliminación de items
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Función de vaciado de carrito
  const clearCart = () => setCartItems([]);

  // Función de verificado de item en carrito
  const isInCart = (id) => cartItems.some(item => item.id === id);

  // Cálculo de total de items y total de precio
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, totalQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};
