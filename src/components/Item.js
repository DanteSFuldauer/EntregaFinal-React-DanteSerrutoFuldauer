import { Link } from 'react-router-dom';

const Item = ({ id, name, img, price, stock }) => {
    return (
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src={img} alt={name}/>
                </figure>
            </div>
            <div class="card-content">               
                <div class="content">
                <p class="title is-4">{name}</p>
                <br/>
                <p class="subtitle is-6">Precio: ${price}</p>
                
                {
                    stock > 0 ?(
                        <p class="subtitle is-6">Stock: {stock}</p>
                    ):(
                        <p class="subtitle is-6 has-text-danger">No hay stock</p>
                    )
                }
                <Link to={`/item/${id}`} className="button is-link">Ver detalle</Link>
                </div>
            </div>
        </div>

    )
}

export default Item;
