import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > initial) setQuantity(quantity - 1);
  };

  const handleAdd = () => { onAdd(quantity); }

  return(
    <div className="box has-text-centered m-5">
        <div className="level">
            <button onClick={handleDecrease} className="button is-danger level-item is-small" style={{width:"auto"}}>-</button>
            <span className="level-item is-size-4">{quantity}</span>
            <button onClick={handleIncrease} className="button is-success level-item is-small" style={{width:"auto"}}>+</button>
        </div>
        <div className="mt-3">
            <button onClick={handleAdd} disabled={!stock} className="button is-primary" style={{width:"auto"}}>Agregar al carrito</button>

            {/* si no hay stock */}
            {!stock && (
                <p className="has-text-danger mt-2">Sin stock</p>
            )}
        </div>
    </div>
  )
};

export default ItemCount;
