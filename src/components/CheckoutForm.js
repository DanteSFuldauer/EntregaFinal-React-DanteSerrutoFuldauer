import { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutForm = ({ onConfirm }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleConfirm = (event) => {
        event.preventDefault();

        const userData = {
            name, lastName, phone, email
        };
        console.log("Datos del usuario: ", userData);
        onConfirm(userData);
    };

    return (
        <div className="container">
            <form onSubmit={handleConfirm}>

                {/* Nombre */}
                <div className="field">
                    <label className="label">Nombre</label>
                    <div className="control">
                        <input 
                        type="text"
                        className="input is-info"
                        placeholder="Ingrese su nombre" 
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        required 
                        />
                    </div>
                </div>

                {/* Apellido */}
                <div className="field">
                    <label className="label">Apellido</label>
                    <div className="control">
                        <input 
                        type="text"
                        className="input is-info"
                        placeholder="Ingrese su apellido"
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                        required 
                        />
                    </div>
                </div>

                {/* Teléfono */}
                <div className="field">
                    <label className="label">Teléfono</label>
                    <div className="control">
                        <input 
                        className="input is-info" 
                        type="text" 
                        placeholder="Ingrese su número de teléfono" 
                        value={phone} 
                        onChange={({ target }) => setPhone(target.value)} 
                        />
                    </div>
                </div>

                {/* Correo electrónico */}
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                        className="input is-info" 
                        type="email" 
                        placeholder="Ingrese su correo electrónico" 
                        value={email} 
                        onChange={({ target }) => setEmail(target.value)} 
                        required
                        />
                    </div>
                </div>

                {/* Boton submit */}
                <div className="field is-grouped  my-5">
                    <p className="control">
                        <button className="button is-link" type="submit">Submit</button>
                    </p>
                    <p className="control">
                        <Link to="/cart" className="button is-danger">Cancelar</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
