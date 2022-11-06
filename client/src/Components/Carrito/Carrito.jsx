import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Axios from "axios";
import ProductoCarrito from "./ProductoCarrito";

const Carrito = () => {

    const [productos, setProductos] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    function calcularTotal() {
        let total = 0;
        productos.forEach((producto) => {
            total += producto.precio_por_kg * producto.cantidad;
        })
        setSubtotal(total);
        console.log(subtotal);
    }

    const actulizarDatos = () => {
        Axios.post("http://localhost:3001/get/carrito", {
            user_email: getAuth().currentUser.email
        }).then((response) => {
            setProductos(response.data);
            console.log(productos);
        });
    }

    useEffect(() => {
        Axios.post("http://localhost:3001/get/carrito", {
            user_email: getAuth().currentUser.email
        }).then((response) => {
            setProductos(response.data);
            let total = 0;
            response.data.forEach((producto) => {
                total += producto.precio_por_kg * producto.cantidad;
            })
            setSubtotal(total);
        });
        console.log(subtotal);
    }, []);

    return (
        <div className="productos container mb-5">
            <h1>TU CARRITO DE COMPRAS</h1>
            <div className="row">
                {productos.length > 0 ? (productos.map((producto) => {
                    return <ProductoCarrito key={producto.id_producto} {...producto} actulizarDatos={actulizarDatos} />
                })) : <h1 className="mt-5" style={{ color: 'black' }}>Tu carrito está vacío</h1>}
            </div>
            {
                productos.length === 0 ? <div></div> :
                    <div className="carr-subtotal">
                        <hr />
                        <h3>SUBTOTAL</h3>
                        <h2>$ {subtotal}</h2>
                        <button id="payBtn" onClick={() => window.open('https://stripe.com/mx', '_blank', 'resizable=yes')}>PAGAR</button>
                    </div>
            }
        </div>
    );
};

export default Carrito;