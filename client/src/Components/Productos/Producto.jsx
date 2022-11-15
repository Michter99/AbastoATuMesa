import React, { useRef } from "react";
import { getAuth } from "firebase/auth";
import Axios from "axios";
import './Productos.css'

function Producto({ id_producto, producto, categoria, precio_por_kg, archivo_imagen }) {

    const cantidadSelect = useRef(1);

    const agregarCarrito = (e) => {
        e.preventDefault();
        alert("Producto agregado al carrito");
        Axios.post("http://localhost:3001/insert/carrito", {
            user_email: getAuth().currentUser.email,
            id_producto: id_producto,
            cantidad: cantidadSelect.current.value
        }).then(() => { });
        cantidadSelect.current.value = 1;
    };

    const comprar = (e) => {
        e.preventDefault();
        window.open('https://stripe.com/mx', '_blank', 'resizable=yes');
        Axios.post("http://localhost:3001/insert/ordenclick", {
            id_producto: id_producto,
            cantidad: cantidadSelect.current.value,
            precio_por_kg: precio_por_kg,
            user_email: getAuth().currentUser.email
        }).then(() => { });
        cantidadSelect.current.value = 1;
    }

    return (
        <div className="productCard col-xl-3 col-lg-4 col-sm-6 mb-3 mt-5">
            <img className="img-fluid" src={archivo_imagen} alt="prodImg" />
            <div className="subdiv-prodCard">
                <p className="catProd">{categoria}</p>
                <p className="nombreProd">{producto} Kg</p>
                <h5 className="precioProd">${precio_por_kg}</h5>
                <label htmlFor="cantidadSel" className="form-label">
                    <b>Cantidad (kg)</b>
                </label>
                <select ref={cantidadSelect} className="form-select" id="cantidadSel">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <button id="carrBtn" onClick={agregarCarrito}>CARRITO</button>
                <button id="comprarBtn" onClick={comprar}>COMPRAR</button>
            </div>
        </div>
    );
}

export default Producto;
