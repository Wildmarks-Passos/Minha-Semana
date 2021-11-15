import "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js";
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUJOkUtn1K6fXByPv7s0jJqzcl321EExI",
    authDomain: "minha-semana-b0f1d.firebaseapp.com",
    projectId: "minha-semana-b0f1d",
    storageBucket: "minha-semana-b0f1d.appspot.com",
    messagingSenderId: "365545587087",
    appId: "1:365545587087:web:1595facb659070b2d8cbfa",
    measurementId: "G-CQM194SX69"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged( user => {
    if( !user ){
        
        let origin = window.location.origin
        let arrPathName = window.location.pathname.split('/')
        arrPathName.splice(arrPathName.length - 2, 2, 'index.html')

        window.location.href = origin + arrPathName.join('/')
    }
})