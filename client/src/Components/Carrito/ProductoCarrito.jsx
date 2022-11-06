import React, { useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import Axios from "axios";
import './Carrito.css'

function ProductoCarrito({ id_producto, producto, categoria, precio_por_kg, archivo_imagen, cantidad }) {

    const cantidadSelect = useRef(cantidad);
    const [cantidadEnSelect, setCantidadEnSelect] = useState(cantidad);

    const borrarDeCarrito = (e) => {
        e.preventDefault();
        Axios.delete(
            `http://localhost:3001/delete/carrito/${getAuth().currentUser.email}/${id_producto}`
        );
        document.location.reload();
    };

    const actualizarCarrito = (e) => {
        setCantidadEnSelect(cantidadSelect.current.value);
        e.preventDefault();
        Axios.put("http://localhost:3001/update/carrito", {
            user_email: getAuth().currentUser.email,
            id_producto: id_producto,
            cantidad: cantidadSelect.current.value
        }).then(() => { });
        document.location.reload();
    }

    return (
        <div className="cartCard col-xl-3 col-lg-4 col-sm-6 mb-3 mt-5">
            <img className="img-fluid" src={require("../Assets/" + archivo_imagen)} alt="prodImg" />
            <div className="subdiv-prodCard">
                <p className="catProd">{categoria}</p>
                <p className="nombreProd">{producto}</p>
                <h5 className="precioProd">${precio_por_kg * cantidadEnSelect}</h5>
                <label htmlFor="cantidadSel" className="form-label">
                    <b>Cantidad (kg)</b>
                </label>
                <select ref={cantidadSelect} className="form-select" id="cantidadSel" defaultValue={cantidad} onChange={actualizarCarrito}>
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
                <button id="delBtn" onClick={borrarDeCarrito}>ELIMINAR</button>
            </div>
        </div>
    );
}

export default ProductoCarrito;
