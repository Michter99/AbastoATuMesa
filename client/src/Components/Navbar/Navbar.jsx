import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../../credenciales";
import "./Navbar.css"

const auth = getAuth(firebaseApp);

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-md">
            <div className="container-fluid">
                <Link to="/">
                    <img src={require("../Assets/logoWhite.svg").default} alt="logo" className="nav-logo" />
                </Link>
                <Link to="/">
                    <h4 className="navbar-brand ms-3" href="../index.html"><b>ABASTO</b> a tu Mesa</h4>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/Productos">
                            <p className="nav-link active"><b>PRODUCTOS</b></p>
                        </Link>
                        <Link to="/Carrito">
                            <p className="nav-link active"><b>CARRITO</b></p>
                        </Link>
                        <Link to="/Cuenta">
                            <p className="nav-link active"><b>CUENTA</b></p>
                        </Link>
                    </div>
                    <button className="logOut" onClick={() => signOut(auth)}>LOG OUT</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
