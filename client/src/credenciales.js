// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVsVKwqWjHOgEc0WoMSw5MQMSrckmoqqE",
    authDomain: "abastoatumesa.firebaseapp.com",
    projectId: "abastoatumesa",
    storageBucket: "abastoatumesa.appspot.com",
    messagingSenderId: "1087037962738",
    appId: "1:1087037962738:web:5b2e7e69be0d2637f8936b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;