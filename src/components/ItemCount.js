import { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > initial) setQuantity(quantity - 1);
  };

<<<<<<< HEAD
  const handleAdd = () => { onAdd(quantity); }

  return(
    <div className="box has-text-centered m-5">
        <div className="level">
            <button onClick={handleDecrease} className="button is-danger level-item is-small" style={{width:"auto"}}>-</button>
            <span className="level-item is-size-4">{quantity}</span>
            <button onClick={handleIncrease} className="button is-success level-item is-small" style={{width:"auto"}}>+</button>
        </div>
        <div class="mt-3">
            <button onClick={handleAdd} disabled={!stock} className="button is-primary" style={{width:"auto"}}>Agregar al carrito</button>

            {/* si no hay stock */}
            {!stock && (
                <p className="has-text-danger mt-2">Sin stock</p>
            )}
        </div>
    </div>
  )
=======
  return (
    <div className="item-count">
      <button onClick={handleDecrease}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrease}>+</button>
      <button onClick={() => onAdd(quantity)}>Agregar al carrito</button>
    </div>
  );
>>>>>>> 0c8392a876b31af7648094bbfe85c909f4c5695e
};

export default ItemCount;
