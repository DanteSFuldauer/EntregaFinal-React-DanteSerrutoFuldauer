<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
import NavBar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailsContainer from "./components/ItemDetailsContainer";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartProvider } from "./context/CartContext";
<<<<<<< HEAD
import "./App.css";
import "bulma/css/bulma.css";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <CartProvider>
          <NavBar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:itemId" element={<ItemDetailsContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<h1>Página no encontrada</h1>} />
            </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
=======
import "./App.css"

function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailsContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
  );
}

export default App;
