import React, { useState, useRef } from "react";
import firebaseApp from "../../credenciales";
import { getAuth, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function signInWithGoogle(event) {
    event.preventDefault();
    signInWithRedirect(auth, googleProvider);
}

const Login = () => {

    const userRef = useRef("");
    const passRef = useRef("");
    const [btnSignLog, setBtnSignLog] = useState("Iniciar sesión");
    const [textSignLog, setTextSignLog] = useState("Regístrate");

    function toggleSignUpLogIn() {
        btnSignLog === "Iniciar sesión" ? setBtnSignLog("Registrarse") : setBtnSignLog("Iniciar sesión");
        textSignLog === "Regístrate" ? setTextSignLog("Inicia sesión") : setTextSignLog("Regístrate");
    }

    function registrarIniciarSesion(e) {
        e.preventDefault();
        switch (btnSignLog) {
            case "Iniciar sesión":
                iniciarSesion();
                break;
            case "Registrarse":
                registrar();
                break;
        }
    }

    const registrar = async () => {
        try {
            await createUserWithEmailAndPassword(auth, userRef.current.value, passRef.current.value);
        } catch (error) {
            alert(error.message);
        }
    }

    const iniciarSesion = async () => {
        try {
            await signInWithEmailAndPassword(auth, userRef.current.value, passRef.current.value);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="main-container" id="container">
            <div className="main-left">
                <div className="left-container">
                    <img
                        src={require("../Assets/logoWhite.svg").default}
                        alt="logo"
                        className="abasto-logo"
                    />
                    <h1 className="h1Top">ABASTO</h1>
                    <h1 className="h1Down">a tu Mesa</h1>
                </div>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <img
                            src={require("../Assets/logoBlack.svg").default}
                            alt="logo"
                            className="abasto-right-logo"
                        />
                        <h1 className="h1TopRight">ABASTO</h1>
                        <h1 className="h1DownRight">a tu Mesa</h1>
                        <h2>Inicia sesión con correo electrónico o accede con Google</h2>
                        <form>
                            <input type="email" ref={userRef} placeholder="Correo" name="" id="emailIn" />
                            <br />
                            <input type="password" ref={passRef} placeholder="Contraseña" name="" id="passIn" />
                            <br />
                            <button id="loginBtn" onClick={registrarIniciarSesion}>{btnSignLog}</button>
                            <button id="googleBtn" onClick={signInWithGoogle}>Google</button>
                        </form>
                        <div className="registerLink">
                            <p>{textSignLog} <span onClick={toggleSignUpLogIn}>aquí</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;