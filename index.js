import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getDatabase, ref, onValue, set, push, get, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
// import { getDatabase, ref, onValue, set, push, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

//import { v4 as uuidv4 } from './node_modules/uuid/dist/esm-browser/index.js';


const fileInput = document.getElementById("get-photo");  // use input file id here
const textinput = document.getElementById("takePicture"); //Change the browser title
const canvas = document.querySelector("#canvas");

let btnEnregistrer = ""
let btnAnnuler = ""

let newPic = ''



const previousDiag = document.querySelector('.previous-diag')

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
console.log(dbRef)


/*

constante newId = 0
Je suis dans la fonction de rechercher un élément complet dans la bdd
if newId != oldId
newId = oldId + 1


const newID = 0
if(newID = )

*/

// Je veux récupérer le dernier id de la database



// dbRef.once("value")
//   .then(function(snapshot) {
//     var key = snapshot.key; // "ada"
//     //var childKey = snapshot.child("name/last").key; // "last"
//     console.log(key)
//   });


  let userId = 0; 
  const nameTest = `S4h${userId}`
  const mailTest = `test${userId}@test.com`
  const imgTest = 'getUnsplashImage()'
  //addFirebase(userId, nameTest, mailTest, imgTest)
  
   
  function addFirebase(userId, name, email, imageUrl) {
  const idStorage = parseInt(localStorage.getItem("idDiag"))
  let userIdToString = userId.toString()
  console.log(idStorage)
  idStorage === userIdToString ? userIdToString = idStorage + 1 : userIdToString = idStorage+ 1
  localStorage.setItem('idDiag', userIdToString)
    set(ref(db, `diagsImage/image${userIdToString}`) , {
      userId: userId,
      username: name,
      email: email,
      profile_picture : imageUrl
    });
    console.log("Un nouveau diag est ajouté")
}
   
  

async function readData() {
  const snapshot = await get(ref(db, `diagsImage`));
  const data = await snapshot.val(); 
  console.log(data)
  var key = snapshot.child("image10/-OILWS-z6kkgtMeYkuhc").val();
  console.log(key)
  // data containe the value that is Read from Database
}
readData()
