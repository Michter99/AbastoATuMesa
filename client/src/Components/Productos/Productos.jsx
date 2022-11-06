import React, { useState, useEffect } from "react";
import Axios from "axios";
import Producto from "./Producto";

function Productos() {

    const [productos, setProductos] = useState([]);
    const [filterCondition, setFilterCondition] = useState("Ninguno");
    const [productoABuscar, setProductoABuscar] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:3001/get/productos").then((response) => {
            setProductos(response.data);
        });
    }, []);

    const buscarProducto = (e) => {
        e.preventDefault();
        if (productoABuscar) {
            setFilterCondition("Ninguno");
            Axios.get(`http://localhost:3001/get/productosFiltrados/${productoABuscar}`).then((response) => {
                setProductos(response.data);
            });
        } else {
            Axios.get("http://localhost:3001/get/productos").then((response) => {
                setProductos(response.data);
            });
        }
    }

    return (
        <div className="productos container mb-5">
            <h1>PRODUCTOS</h1>
            <div className="row filters">
                <div className="col-sm-4 filter-form">
                    <label htmlFor="filter" className="form-label">
                        <b>Filtro</b>
                    </label>
                    <select
                        className="form-select"
                        id="filter"
                        defaultValue="Ninguno"
                        onChange={(e) => {
                            setFilterCondition(e.target.value);
                        }}
                    >
                        <option>Ninguno</option>
                        <option>Frutas y Verduras</option>
                        <option>Carnes y Pescados</option>
                        <option>Abarrotes</option>
                    </select>
                </div>
                <form className="searchForm col-sm-7">
                    <label htmlFor="buscarInput"><b>Búsqueda</b></label>
                    <br />
                    <input className="form-control" type="text" onChange={(e) => setProductoABuscar(e.target.value)} id="buscarInput" placeholder="¿Qué estás buscando?" />
                    <button className="btn btn-outline-primary" onClick={buscarProducto}>Buscar</button>
                </form>
            </div>
            <div className="row">
                {productos.length > 0 ? (productos.map((producto) => {
                    if (producto.categoria === filterCondition || filterCondition === "Ninguno")
                        return <Producto key={producto.id_producto} {...producto} />
                })) : <h1>Producto no encontrado</h1>}
            </div>
        </div>
    );
};

export default Productos;