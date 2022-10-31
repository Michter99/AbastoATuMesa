import React from "react";
import './Productos.css'

function Producto({ producto, categoria, precio_por_kg, archivo_imagen }) {
    return (
        <div className="productCard col-xl-3 col-lg-4 col-sm-6 mb-3 mt-5">
            <img className="img-fluid" src={require("../Assets/" + archivo_imagen)} alt="prodImg" />
            <div className="subdiv-prodCard">
                <p className="catProd">{categoria}</p>
                <p className="nombreProd">{producto} Kg</p>
                <h5 className="precioProd">${precio_por_kg}</h5>
                <button id="carrBtn">CARRITO</button>
                <button id="comprarBtn">COMPRAR</button>
            </div>
        </div>
    );
}

export default Producto;
