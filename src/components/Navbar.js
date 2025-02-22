import CartWidget from "./CartWidget";
import { NavLink, Link } from "react-router-dom";
import logo from '../assets/logo.png';

const NavBar = () => {
  return (
    <nav className="container my-5">
      <Link className="navbar-brand d-flex align-items-center" to="/">
<<<<<<< HEAD
        <img src={logo} alt="Brand Logo" style={{ height: '40px', marginRight: '10px' }}/>BiteTheApple</Link>
=======
        <img src={logo} alt="Brand Logo" style={{ height: '40px', marginRight: '10px' }} />
        BiteTheApple
      </Link>
>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
      <div className="is-flex is-align-items-center is-justify-content-center">
        <NavLink to={`/`} className={({ isActive }) => `button is-primary m-3 ${isActive ? "button is-link m-3" : "button is-primary m-3"}`}>
          Home
        </NavLink>
        <NavLink to={`/category/telefonos`} className={({ isActive }) => `button is-primary m-3 ${isActive ? "button is-link m-3" : "button is-primary m-3"}`}>Teléfonos</NavLink>
        <NavLink to={`/category/notebooks`} className={({ isActive }) => `button is-primary m-3 ${isActive ? "button is-link m-3" : "button is-primary m-3"}`}>Notebooks</NavLink>
        <NavLink to={`/category/auriculares`} className={({ isActive }) => `button is-primary m-3 ${isActive ? "button is-link m-3" : "button is-primary m-3"}`}>Auriculares</NavLink>
        <CartWidget />
      </div>
    </nav>
  );
}

export default NavBar;
