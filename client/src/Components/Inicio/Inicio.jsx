import React from "react";
import Navbar from "../Navbar/Navbar";
import Landing from "../Landing/Landing";
import Productos from "../Productos/Productos"
import Cuenta from "../Cuenta/Cuenta"
import Carrito from "../Carrito/Carrito"
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './Inicio.css'


const Inicio = () => {
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