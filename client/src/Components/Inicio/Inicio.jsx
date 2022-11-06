import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Axios from "axios";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";
import Productos from "../Productos/Productos"
import Cuenta from "../Cuenta/Cuenta"
import Carrito from "../Carrito/Carrito"
import './Inicio.css'

const Inicio = () => {

    useEffect(() => {
        Axios.post("http://localhost:3001/insert/cliente", {
            user_email: getAuth().currentUser.email,
        }).then(() => { });
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Landing />} />
                <Route path="/Productos" element={<Productos />} />
                <Route path="/Cuenta" element={<Cuenta />} />
                <Route path="/Carrito" element={<Carrito />} />
            </Routes>
        </Router>
    );
};

export default Inicio;