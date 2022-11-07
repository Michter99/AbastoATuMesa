import React, { useState, useEffect, useCallback } from "react";
import { getAuth } from "firebase/auth";
import Axios from "axios";
import ProductoCarrito from "./ProductoCarrito";
import { useMemo } from "react";

const Carrito = () => {

    const [productos, setProductos] = useState([]);

    const calcularTotal = useMemo(() => {
        let total = 0;
        productos.forEach((producto) => {
            total += producto.precio_por_kg * producto.cantidad;
        });
        return (total);
    }, [productos]);

    const borrarDeCarrito = useCallback((id_producto) => {
        Axios.delete(
            `http://localhost:3001/delete/carrito/${getAuth().currentUser.email}/${id_producto}`
        ).then((response) => {
            setProductos(response.data);
        });
    }, []);

    const actualizarCarrito = useCallback((id_producto, cantidadSelect) => {
        Axios.put("http://localhost:3001/update/carrito", {
            user_email: getAuth().currentUser.email,
            id_producto: id_producto,
            cantidad: cantidadSelect
        }).then((response) => {
            setProductos(response.data);
        });
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:3001/get/carrito", {
            user_email: getAuth().currentUser.email
        }).then((response) => {
            setProductos(response.data);
        });
    }, []);

    return (
        <div className="productos container mb-5">
            <h1>TU CARRITO DE COMPRAS</h1>
            <div className="row">
                {productos.length > 0 ? (productos.map((producto) => {
                    return <ProductoCarrito key={producto.id_producto} borrarDeCarrito={borrarDeCarrito} actualizarCarrito={actualizarCarrito} {...producto} />
                })) : <h1 className="mt-5" style={{ color: 'black' }}>Tu carrito está vacío</h1>}
            </div>
            {
                productos.length === 0 ? <div></div> :
                    <div className="carr-subtotal">
                        <hr />
                        <h3>SUBTOTAL</h3>
                        <h2>$ {calcularTotal}</h2>
                        <button id="payBtn" onClick={() => window.open('https://stripe.com/mx', '_blank', 'resizable=yes')}>PAGAR</button>
                    </div>
            }
        </div>
    );
};

export default Carrito;