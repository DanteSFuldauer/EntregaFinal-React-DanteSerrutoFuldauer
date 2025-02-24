import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ id, name, price, quantity, img }) => {
  //Importar función de eliminación de item
    const { removeItem } = useContext(CartContext);

    const handleRemove = () => {removeItem(id)};

    //borrar
    console.log('Datos de CartItem:', { id, name, price, quantity, img });

    return (
        <div className="box">
            <ul className="list is-hoverable">
                <li className="list-item">
                    <div className="columns is-vcentered">
                        
                        {/* Columna para la imagen */}
                        <div className="column is-one-quarter">
                            <figure className="image is-128x128">
                                <img src={img} alt={name} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                            </figure>
                        </div>

                        {/* Columna para los detalles del producto */}
                        <div className="column">
                            <p className="title is-5">{name}</p>
                            <p className="subtitle is-6">Precio: ${price}</p>
                            <p className="subtitle is-6">Cantidad: {quantity}</p>
                            <p className="has-text-weight-bold">Subtotal: ${price * quantity}</p>
                        </div>

                        {/* Columna para el botón eliminar */}
                        <div className="column is-one-quarter">
                            <button onClick={handleRemove} className="button is-danger is-fullwidth">Eliminar</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CartItem;
