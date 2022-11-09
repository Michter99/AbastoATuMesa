import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { getAuth } from "firebase/auth";
import Pedido from "./Pedido";
import './Cuenta.css'

const Cuenta = () => {

    const [cuenta, setCuenta] = useState({});
    const [editView, setEditView] = useState(true);
    const [pedidos, setPedidos] = useState([]);
    const [pedidosAgrupados] = useState({});
    const nombreRef = useRef(cuenta.nombre);
    const domRef = useRef(cuenta.direccion);

    useEffect(() => {
        Axios.post("http://localhost:3001/get/cuenta", {
            user_email: getAuth().currentUser.email
        }).then((response) => {
            setCuenta(...response.data);
        });

        Axios.post("http://localhost:3001/get/pedidos", {
            user_email: getAuth().currentUser.email
        }).then((response) => {
            setPedidos(response.data);
        })
    }, []);


    const agruparPorOrden = () => {
        pedidos.forEach(pedido => {
            pedidosAgrupados[pedido.id_orden] = [];
        });
        pedidos.forEach(pedido => {
            pedidosAgrupados[pedido.id_orden].push(pedido);
        });
    };

    agruparPorOrden();

    const actualizarInfoPersonal = () => {
        Axios.put("http://localhost:3001/update/infoPer", {
            user_email: getAuth().currentUser.email,
            nombre: nombreRef.current.value,
            domicilio: domRef.current.value
        }).then((response) => {
            setCuenta(...response.data);
        });
        setEditView(!editView);
    }

    return (
        <div className="container mb-5">
            <div className="productos container mb-5">
                <h1>TU CUENTA</h1>
            </div>
            <div className="personal-info">
                <h3 className="mb-4">INFORMACIÓN PERSONAL</h3>
                {editView ? (
                    <div className="viewInfo">
                        <h4>Nombre</h4>
                        <p>{cuenta.nombre ? cuenta.nombre : "No registrado"}</p>
                        <h4>Correo</h4>
                        <p>{cuenta.correo}</p>
                        <h4>Domicilio</h4>
                        <p>{cuenta.direccion ? cuenta.direccion : "No registrado"}</p>
                        <button id="editarCuenta" onClick={() => setEditView(!editView)}>EDITAR</button>
                    </div>
                ) :
                    <div className="editInfo">
                        <h4>Nombre</h4>
                        <input ref={nombreRef} defaultValue={cuenta.nombre} type="text" id="nombreIpt" />
                        <h4 className="mt-4">Correo</h4>
                        <p>{cuenta.correo}</p>
                        <h4>Domicilio</h4>
                        <input ref={domRef} defaultValue={cuenta.direccion} type="text" id="domIpt" />
                        <br />
                        <div className="botones">
                            <button id="cancelar" onClick={() => setEditView(!editView)}>CANCELAR</button>
                            <button id="confirmar" onClick={actualizarInfoPersonal}>CONFIRMAR</button>
                        </div>
                    </div>
                }
            </div>
            <div className="pedidos mt-5 container">
                <h1 className="mb-3">TUS PEDIDOS</h1>
                <div className="row">
                    {pedidos.length > 0 ?
                        Object.entries(pedidosAgrupados).map(pedido => {
                            return <Pedido key={pedido[0]} pedidoInfo={pedido[1]} />
                        }) : <div><h3>Sin pedidos</h3><h4>Tus pedidos aparecerán aquí</h4></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cuenta;