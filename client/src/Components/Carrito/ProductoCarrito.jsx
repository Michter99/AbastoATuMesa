import React, { useRef, useState } from "react";
import './Carrito.css'

function ProductoCarrito(props) {

    const cantidadSelect = useRef(props.cantidad);
    const [selectValor, setSelectValor] = useState(props.cantidad)

    return (
        <div className="cartCard col-xl-3 col-lg-4 col-sm-6 mb-3 mt-5">
            <img className="img-fluid" src={require("../Assets/" + props.archivo_imagen)} alt="prodImg" />
            <div className="subdiv-prodCard">
                <p className="catProd">{props.categoria}</p>
                <p className="nombreProd">{props.producto}</p>
                <p className="form-label">Subtotal</p>
                <h5 className="precioProd">${props.precio_por_kg * selectValor}</h5>
                <label htmlFor="cantidadSel" className="form-label">
                    <b>Cantidad (kg)</b>
                </label>
                <select ref={cantidadSelect} className="form-select" id="cantidadSel" defaultValue={props.cantidad} onChange={() => { props.actualizarCarrito(props.id_producto, cantidadSelect.current.value); setSelectValor(cantidadSelect.current.value); }}>
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
                <button id="delBtn" onClick={() => props.borrarDeCarrito(props.id_producto)}>ELIMINAR</button>
            </div>
        </div>
    );
}

export default ProductoCarrito;
