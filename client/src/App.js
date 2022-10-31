import React, { useState } from "react";
import Inicio from "./Components/Inicio/Inicio";
import Login from "./Components/Login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebaseApp from "./credenciales";

const auth = getAuth(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  onAuthStateChanged(auth, (usuarioFirebase) => usuarioFirebase ? setUsuarioGlobal(usuarioFirebase) : setUsuarioGlobal(null));
  return (<>{usuarioGlobal ? <Inicio correoUsuario={usuarioGlobal.email} /> : <Login />}</>);
}

export default App;