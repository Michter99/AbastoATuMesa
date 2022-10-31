import React from "react";
import firebaseApp from "../../credenciales";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import './Login.css'

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

function signInWithGoogle(event) {
    event.preventDefault();
    signInWithRedirect(auth, googleProvider);
}

const Login = () => {

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
                            <input type="email" placeholder="Correo" name="" id="emailIn" />
                            <br />
                            <input type="password" placeholder="Contraseña" name="" id="passIn" />
                            <br />
                            <input type="submit" value="Iniciar sesión" id="loginBtn"></input>
                            <button id="googleBtn" onClick={signInWithGoogle}>Google</button>
                        </form>
                        <div className="registerLink">
                            <p>Regístrate <span>aquí</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Login;