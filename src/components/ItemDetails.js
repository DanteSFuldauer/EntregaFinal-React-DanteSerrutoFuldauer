import ItemCount from "./ItemCount";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

/* Importamos contexto del carrito de compras */
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);

    const { addItem } = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);

        const item = {
            id, name, price, img
        };
        addItem(item, quantity);
    };

    return (
        <div className="card">
            <div className="card-content">
                <div className="columns is-vcentered">
                    {/* Columna para la imagen */}
                    <div className="column is-one-third">
                        <figure className="image is-4by3">
                            <img src={img} alt={name} />
                        </figure>
                    </div>

                    {/* Columna para los datos */}
                    <div className="column">
                        <div className="content">
                            <h2 className="title is-4">{name}</h2>
                            <br />
                            <p className="subtitle is-6">Categoría: {category}</p>
                            <p>Descripción: {description}</p>
                            <p>Precio unitario: ${price}</p>
                            {/* Mostrar cantidad seleccionada y precio total */}
                            {quantityAdded > 0 && (
                                <>
                                    <p className="has-text-weight-bold">
                                        Cantidad seleccionada: {quantityAdded}
                                    </p>
                                    <p className="has-text-weight-bold has-text-info">
                                        Precio total: ${price * quantityAdded}
                                    </p>
                                </>
                            )}
                            {
                                quantityAdded > 0 ? (
                                    <Link to="/cart" className="button is-warning">Terminar compra</Link>
                                ) : (
                                    <ItemCount onAdd={handleOnAdd} stock={stock} initial={1} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
