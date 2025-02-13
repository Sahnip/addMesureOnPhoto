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
// Render Image on Canvas
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


// APPRENTISSAGE AVEC CLAUDE POUR TOOL CARRÉ, FLÈCHE...


const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

let startX, startY, endX, endY;


let rectangleInfo = {
    points: [],
    isSelected: false,
    selectedHandle: -1
};

let isDrawing = false;

// État global pour suivre quelle forme on dessine
let currentShape = 'rectangle'; // ou 'arrow'

let currentColor = '#000000'; // Couleur par défaut : noir

let shapes = [];

// Structure d'une forme
class Shape {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
    }
}

function setColor(color) {
    currentColor = color;
    ctx.strokeStyle = color;
}

// Fonction pour changer de forme
function setShape(shape) {
    currentShape = shape;
    // Réinitialiser l'état
    isDrawing = false;
    rectangleInfo.points = [];
    rectangleInfo.isSelected = false;
    rectangleInfo.selectedHandle = -1;
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function isPointInHandle(mouseX, mouseY, handleX, handleY, handleSize = 6) {
    // On calcule la distance entre le point de la souris et le centre de la poignée
    const distance = Math.sqrt(
        Math.pow(mouseX - handleX, 2) + 
        Math.pow(mouseY - handleY, 2)
    );
    
    // Si la distance est inférieure à la taille de la poignée, la souris est dessus
    return distance <= handleSize;
}

function getSelectedHandle(mouseX, mouseY) {
    for(let i = 0; i < rectangleInfo.points.length; i++) {
        const point = rectangleInfo.points[i];
        if(isPointInHandle(mouseX, mouseY, point.x, point.y)) {
            return i; // Retourne l'index du coin sélectionné
        }
    }
    return -1; // Aucun coin sélectionné
}

// Fonction pour dessiner les poignées
function drawHandles() {
    ctx.fillStyle = 'blue';
    rectangleInfo.points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Fonction pour dessiner le rectangle
function drawRectangle(points, isSelected) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.strokeStyle = isSelected ? '#FF0000' : currentColor;
    ctx.stroke();

    // Dessiner les poignées si sélectionné
    if (isSelected) {
        points.forEach(point => {
            drawHandle(point.x, point.y);
        });
    }
}

function drawArrow(startX, startY, endX, endY, isSelected) {
    ctx.strokeStyle = isSelected ? '#FF0000' : currentColor;
    // Corps de la flèche
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Calcul de l'angle de la pointe
    const angle = Math.atan2(endY - startY, endX - startX);
    
    // Dessin de la pointe
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
        endX - 15 * Math.cos(angle - Math.PI/6),
        endY - 15 * Math.sin(angle - Math.PI/6)
    );
    ctx.lineTo(
        endX - 15 * Math.cos(angle + Math.PI/6),
        endY - 15 * Math.sin(angle + Math.PI/6)
    );
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
}


function redrawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        ctx.strokeStyle = shape.color;
        if (shape.type === 'arrow') {
            drawArrow(shape.startX, shape.startY, shape.endX, shape.endY, shape.isSelected);
        } else if (shape.type === 'rectangle') {
            // Adapter le code du rectangle pour utiliser les propriétés de shape
            drawRectangle(shape.points, shape.isSelected);
        }
    });
}

// Retour en arrière après dessin d'une forme
function undoLastShape() {
    if (shapes.length > 0) {
        shapes.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface le canvas
        redrawShapes();
    }
}


// Calcul de la distance d'un point avec une ligne
function distancePointToLine(px, py, x1, y1, x2, y2) {
  // Calcul basé sur la formule mathématique de la distance point-ligne
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  const param = len_sq !== 0 ? dot / len_sq : -1;

  let xx, yy;

  if (param < 0) {
      xx = x1;
      yy = y1;
  } else if (param > 1) {
      xx = x2;
      yy = y2;
  } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;

  return Math.sqrt(dx * dx + dy * dy);
}


// Vérifier si l'utilisateur clique bien une forme
function isPointInShape(x, y, shape) {
    switch(shape.type) {
        case 'rectangle':
            // Vérifier si le point est dans le rectangle
            const points = shape.points;
            const minX = Math.min(...points.map(p => p.x));
            const maxX = Math.max(...points.map(p => p.x));
            const minY = Math.min(...points.map(p => p.y));
            const maxY = Math.max(...points.map(p => p.y));
            return x >= minX && x <= maxX && y >= minY && y <= maxY;
            
        case 'arrow':
            // Vérifier si le point est près de la ligne de la flèche
            return distancePointToLine(x, y, shape.startX, shape.startY, shape.endX, shape.endY) < 5;
            
        default:
            return false;
    }
}

let selectedShape = null;
function handleCanvasClick(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // D'abord, désélectionner la forme précédente
  if (selectedShape) {
      selectedShape.isSelected = false;
  }

  // Chercher si on clique sur une forme existante
  let clickedOnShape = false;
  
  for (let shape of shapes) {
      if (isPointInShape(x, y, shape)) {
          shape.isSelected = true;
          selectedShape = shape;
          clickedOnShape = true;
          break; // On sort de la boucle dès qu'on trouve une forme
      }
  }

  // Si on n'a cliqué sur aucune forme et qu'un outil est sélectionné
  if (!clickedOnShape && currentTool) {
      isDrawing = true;
      startDrawing(x, y);
  }

  // Redessiner le canvas
  redrawCanvas();
}


function handleMouseDown(e) {
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;

  // Vérifier d'abord si on clique sur une forme existante
  let clickedOnShape = false;
  
  for (let shape of shapes) {
      if (isPointInShape(startX, startY, shape)) {
          if (selectedShape) {
              selectedShape.isSelected = false;
          }
          shape.isSelected = true;
          selectedShape = shape;
          clickedOnShape = true;
          break;
      }
  }

  if (!clickedOnShape) {
      isDrawing = true;
  }

  redrawCanvas();
}


function redrawCanvas() {
  const ctx = canvas.getContext('2d');
  
  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Redessiner l'image de fond si elle existe
  if (image_data_url) {
      const img = new Image();
      img.src = image_data_url;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
  
  // Redessiner toutes les formes
  shapes.forEach(shape => {
      drawShape(ctx, shape);
  });
}

// Supprimer une forme
function deleteSelectedShape() {
  if (selectedShape) {
      // Trouver l'index de la forme sélectionnée
      const index = shapes.findIndex(shape => shape === selectedShape);
      if (index !== -1) {
          // Supprimer la forme du tableau
          shapes.splice(index, 1);
          selectedShape = null;
          // Redessiner le canvas
          redrawAllShapes();
      }
  }
}

// Ajouter un écouteur pour la touche "Delete" ou "Backspace"
document.addEventListener('keydown', function(e) {
  if (e.key === 'Delete' || e.key === 'Backspace') {
      deleteSelectedShape();
  }
});


// Gestion du début du dessin
canvas.addEventListener('mousedown', function(e) {
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Vérifier d'abord si on clique sur une forme existante
    let clickedOnShape = false;
    
    for (let shape of shapes) {
        if (isPointInShape(mouseX, mouseY, shape)) {
            if (selectedShape) {
                selectedShape.isSelected = false;
            }
            shape.isSelected = true;
            selectedShape = shape;
            clickedOnShape = true;
            redrawAllShapes(); // Nouvelle fonction à créer
            break;
        }
    }

    if (!clickedOnShape) {
        // Votre code existant pour le dessin
        if(currentShape === 'rectangle') {
            // ... votre code existant ...
        } else if(currentShape === 'arrow') {
            // ... votre code existant ...
        }
    }
});



// Gestion du mouvement
canvas.addEventListener('mousemove', function(e) {
    if (!isDrawing) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Permet d'éviter de dessiner des milliers de fleches
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(currentShape === 'rectangle') {
    		if(rectangleInfo.selectedHandle !== -1) {
        // Modification d'un coin existant
        rectangleInfo.points[rectangleInfo.selectedHandle] = {x: mouseX, y: mouseY};
        } else {
            // Création d'un nouveau rectangle
            rectangleInfo.points[1].x = mouseX;
            rectangleInfo.points[2].x = mouseX;
            rectangleInfo.points[2].y = mouseY;
            rectangleInfo.points[3].y = mouseY;
        }

        // Redessiner
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRectangle(rectangleInfo.points, rectangleInfo.isSelected);
    }else if(currentShape === 'arrow') {
        endX = mouseX;
        endY = mouseY;
        drawArrow(startX, startY, endX, endY, rectangleInfo.isSelected);
    }
});

// Fin du dessin
canvas.addEventListener('mouseup', function(e) {
    if (isDrawing) {
        const newShape = new Shape(currentShape, currentColor);
        
        if (currentShape === 'rectangle') {
            // Pour le rectangle, copier les points
            newShape.points = [...rectangleInfo.points];
        } else if (currentShape === 'arrow') {
            // Pour la flèche, copier les coordonnées
            newShape.startX = startX;
            newShape.startY = startY;
            newShape.endX = endX;
            newShape.endY = endY;
        }
        
        shapes.push(newShape);
    }
    
    isDrawing = false;
    rectangleInfo.selectedHandle = -1;
});

function redrawAllShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redessiner toutes les formes
    shapes.forEach(shape => {
        if (shape.type === 'rectangle') {
            drawRectangle(shape.points, shape.isSelected);
        } else if (shape.type === 'arrow') {
            drawArrow(shape.startX, shape.startY, shape.endX, shape.endY, shape.isSelected);
        }
    });
}





