import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getDatabase, ref, onValue, set, push, get, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
// import { getDatabase, ref, onValue, set, push, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


const fileInput = document.getElementById("get-photo");  // use input file id here
const textinput = document.getElementById("takePicture"); //Change the browser title
const canvas = document.querySelector("#canvas");
const divBtnCanvas = document.querySelector(".divBtnCanvas")

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


  let userId = uuidv4(); 
  const nameTest = `S4h${userId}`


window.addEventListener('dblclick', function(e){
  let arraySnap = []
  const distanceRef = ref(db, `diagsImage`);
  onValue(distanceRef, (snapshot) => {
      const datas = snapshot.val()
      arraySnap = [] // Reset array before adding new values
      snapshot.forEach((child) => {
          //const dataKey = child.key
          const data = child.val()
          arraySnap.push(data);
      })
      intVal.map(val => {
        const eventi = e.target.dataset.iddiag
        console.log(`Voici la comparaison de ce tour ${val.userId} avec ${eventi}`)
        removeFirebase(val.userId, eventi)
      })
  })
})
// removeFirebase(e)
  
  // AJOUTER LES ELEMENTS DANS LA BDD
  function addFirebase(userId, name, imageUrl) {
  // const idStorage = parseInt(localStorage.getItem("idDiag"))
  // let userIdToString = userId
  // idStorage === userIdToString ? userIdToString = idStorage + 1 : userIdToString = idStorage+ 1
  // localStorage.setItem('idDiag', userIdToString.toString())
    set(ref(db, `diagsImage/image${userId}`) , {
      userId: userId,
      username: name,
      imageUrl : imageUrl
    });
    console.log("Un nouveau diag est ajouté")
}

function removeFirebase(uId, e){
  if(e === `image-${uId}`){
    remove(ref(db, `diagsImage/image${uId}`))
    console.log('Le diag est bien supprimé')
  }else{
    console.log("une erreur lors de la suppression")
  }
}
   
  
// RÉCUPÉRER LES ELEMENT DE LA BDD
async function readData() {
  const snapshot = await get(ref(db, `diagsImage`));
  const data = await snapshot.val();
  // data containe the value that is Read from Database
}
readData()


fileInput.addEventListener('change', function(event){
  handleChange()
  const files = event.target.files;
  if (files.length > 0) {
    canvas.classList.remove('hidden')
    imageFromInuptToCanvas();
    createBtnCanvas()
    console.log(image_data_url)
    btnEnregistrer.addEventListener('click', function(){
        addFirebase(userId, nameTest, image_data_url)
        image_data_url=""
        canvas.classList.add('hidden')
        removeBtnCanvas()
        textinput.value = "+ Nouvelle superficie"
        console.log('canvas fermé')
        
        setTimeout(() => {
          console.log("Rechargement dans 1s");
          window.location.reload()
        }, "1000");
    })
    
    btnAnnuler.addEventListener('click', function(){
        image_data_url=""
        canvas.classList.add('hidden')
        removeBtnCanvas()
        textinput.value = "+ Nouvelle superficie"
        console.log('canvas fermé')
        window.location.reload()
    })
  } else {
      console.log('Aucun fichier sélectionné');
  }
  
})



// CLICK DU BTN PRINCIPALE VERS L'INPUT FILE POUR SIMULER À DISTANCE
function browseClick() {
  fileInput.click();
}
// GÉRER LE CHANGEMENT DE L'ÉTAT DE INPUT FILE
function handleChange() {
  textinput.value = fileInput.value; //Value of input type button equal to value of input type file  
}

textinput.addEventListener('click', browseClick);


let image_data_url = ""
function imageFromInuptToCanvas() {
  const ctx = canvas.getContext('2d', { alpha: false }); // Optimisation du contexte
  var file = document.getElementById('get-photo').files[0];
  var reader = new FileReader();
  
  reader.onload = function(e) {
    var image = document.createElement("img");
    image.onload = () => {
      // Utiliser les dimensions naturelles de l'image
      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;
      
      // Calculer le ratio pour l'affichage tout en gardant la résolution originale
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.8;
      
      let displayWidth = naturalWidth;
      let displayHeight = naturalHeight;
      
      // Ajuster les dimensions d'affichage
      if (displayWidth > maxWidth) {
        const ratio = maxWidth / displayWidth;
        displayWidth = maxWidth;
        displayHeight = naturalHeight * ratio;
      }
      
      if (displayHeight > maxHeight) {
        const ratio = maxHeight / displayHeight;
        displayHeight = maxHeight;
        displayWidth = displayWidth * ratio;
      }
      
      // Définir les dimensions du canvas à la taille naturelle de l'image
      canvas.width = naturalWidth;
      canvas.height = naturalHeight;
      
      // Appliquer un style CSS pour l'affichage
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      // Configurer le contexte pour une meilleure qualité
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Dessiner l'image
      ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);
      
      // Utiliser une meilleure qualité pour l'export
      image_data_url = canvas.toDataURL('image/jpeg', 1.0);
    };
    image.src = reader.result;
  }
  reader.readAsDataURL(file);
  return image_data_url;
}



/* FUNCTION TO CREATE OR REMOVE BUTTONS ON CANVAS */
function createBtnEnregistrer(){
  btnEnregistrer = document.createElement('button')
  btnEnregistrer.classList.add('btnCanvas')
  btnEnregistrer.textContent = "Enregistrer"
  divBtnCanvas.appendChild(btnEnregistrer)  // Changed from append to appendChild
}

function createBtnAnnuler(){
  btnAnnuler = document.createElement('button')
  btnAnnuler.classList.add('btnCanvas')
  btnAnnuler.textContent = "Annuler"
  divBtnCanvas.appendChild(btnAnnuler)  // Changed from append to appendChild
}

function createBtnCanvas(){
  createBtnEnregistrer()
  createBtnAnnuler()
}

function removeBtnCanvas(){
  btnEnregistrer.remove()  // Changed from divBtnCanvas.remove()
  btnAnnuler.remove()      // Changed from divBtnCanvas.remove()
}


let intVal = []
function render(){
  const distanceRef = ref(db, `diagsImage`);
  onValue(distanceRef, (snapshot) => {
      const datas = snapshot.val()
      intVal = [] // Reset array before adding new values
      snapshot.forEach((child) => {
          //const dataKey = child.key
          const data = child.val()
          intVal.push(data);
      })
      
      // Sort array by userId in ascending order
      //intVal.sort((a, b) => b.userId - a.userId)
      
      // Clear previous content
      previousDiag.innerHTML = ''
      
      // Add sorted elements to DOM
      intVal.forEach(val => {
          previousDiag.innerHTML += `<div class="card">
                                      <img src="${val.imageUrl}" data-iddiag="image-${val.userId}">
                                   </div>`
      })
      console.log(intVal);
  })
}

render()