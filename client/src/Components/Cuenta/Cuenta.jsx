import React, { useEffect, useState } from "react";
import Axios from "axios";
import { getAuth } from "firebase/auth";
import './Cuenta.css'

const Cuenta = () => {

    const [cuenta, setCuenta] = useState({});

    useEffect(() => {
        Axios.post("http://localhost:3001/get/cuenta", {
            user_email: getAuth().currentUser.email
        }).then((response) => {
            setCuenta(...response.data);
        });
    }, []);

    return (
        <div className="container">
            <div className="productos container mb-5">
                <h1>TU CUENTA</h1>
            </div>
            <div className="personal-info">
                <h3 className="mb-4">INFORMACIÓN PERSONAL</h3>
                <h4>Nombre</h4>
                <p>{cuenta.domicilio ? cuenta.domicilio : "No registrado"}</p>
                <h4>Correo</h4>
                <p>{cuenta.correo}</p>
                <h4>Domicilio</h4>
                <p>{cuenta.domicilio ? cuenta.domicilio : "No registrado"}</p>
                <button id="editarCuenta">EDITAR</button>
            </div>
        </div>
    );
};

export default Cuenta;