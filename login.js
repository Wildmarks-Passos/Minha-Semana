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

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

var db = firebase.firestore()

var btnEntrar = document.getElementById('btnEntrar')
var listOfDaysWeek = ['lista-segunda', 'lista-terca', 'lista-quarta','lista-quinta', 
                      'lista-sexta', 'lista-sabado', 'lista-domingo']

//Criando novo usuário ou fazendo login
btnEntrar.addEventListener('click', () => {
    
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{

            let origin = window.location.origin
            let userUid = firebase.auth().currentUser.uid

            const USER_UID_COLLECTION = db.collection(userUid)

            USER_UID_COLLECTION.doc().add({})

            localStorage.setItem('uid', userUid)
            window.location.href = origin + '/dashboard/dashboard.html'
        }).catch( error =>{

            if (error.code == 'auth/email-already-in-use'){
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {

                    let origin = window.location.origin
                    let userUid = firebase.auth().currentUser.uid

                    localStorage.setItem('uid', userUid)
                    window.location.href = origin + '/dashboard/dashboard.html'
                }).catch( error => {

                    console.log(error)
                })
            }
        })

    })

})
