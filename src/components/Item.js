import { Link } from 'react-router-dom';

const Item = ({ id, name, img, price, stock }) => {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image-container">
                    <img src={img} alt={name}/>
                </figure>
            </div>
            <div className="card-content">               
                <div className="content">
                    <p className="title is-5">{name}</p>
                    <br/>
                    <p className="subtitle is-6">${price}</p>
                    {
                        stock > 0 ? (
                            <p className="subtitle is-6">Stock: {stock}</p>
                        ) : (
                            <p className="subtitle is-6 has-text-danger">No hay stock</p>
                        )
                    }
                    <Link to={`/item/${id}`} className="button is-link">Ver detalle</Link>
                </div>
            </div>
        </div>
    );
}

export default Item;
