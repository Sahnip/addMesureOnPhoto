import { initializeApp } from './node_modules/firebase/app';
import { getDatabase, ref, onValue, set, push, get, child, update, remove } from "./node_modules/firebase/database";
// import { getDatabase, ref, onValue, set, push, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

//import { v4 as uuidv4 } from './node_modules/uuid/dist/esm-browser/index.js';


const fileInput = document.getElementById("get-photo");  // use input file id here
const textinput = document.getElementById("takePicture"); //Change the browser title
const canvas = document.querySelector("#canvas");

let btnEnregistrer = ""
let btnAnnuler = ""

let newPic = ''


//const getPhoto = document.getElementById('get-photo').files[0]

const previousDiag = document.querySelector('.previous-diag')
// import { initializeApp } from './node_modules/firebase/app';
// import { getDatabase, onValue, ref, set } from './node_modules/firebase/database';


//e.target.files[0]
const firebaseConfig = {
    apiKey: "AIzaSyBghv1dDk0BBu1FaT6dFdEIu6VLD6Df9gI",
    authDomain: "diagarea.firebaseapp.com",
    databaseURL: "https://diagarea-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "diagarea",
    storageBucket: "diagarea.firebasestorage.app",
    messagingSenderId: "663558652099",
    appId: "1:663558652099:web:f4d97483d30d7567832276"
  };
  
const app = initializeApp(firebaseConfig);

const db = getDatabase(app)

const dbRef = ref(db, 'diagsImage');


let userId = 0; 

/*

constante newId = 0
Je suis dans la fonction de rechercher un élément complet dans la bdd
if newId != oldId
newId = oldId + 1


const newID = 0
if(newID = )

*/

// Je veux récupérer le dernier id de la database



dbRef.once("value")
  .then(function(snapshot) {
    var key = snapshot.key; // "ada"
    //var childKey = snapshot.child("name/last").key; // "last"
    console.log(key)
  });


//var ref = firebase.database().ref("diagsImage");
ref.once("value")
  .then(function(snapshot) {
    var key = snapshot.key; // "ada"
    var childKey = snapshot.child("name/last").key; // "last"
  });