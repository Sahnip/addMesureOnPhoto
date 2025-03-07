import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getDatabase, ref, onValue, set, push, get, child, update, remove } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';


//import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Div wrapper canvas
const canvasContainer = document.querySelector("#canvas-container")


const fileInput = document.getElementById("get-photo");  // use input file id here
const textinput = document.getElementById("takePicture"); //Change the browser title
const canvas = document.querySelector("#canvas");
const divBtnCanvas = document.querySelector(".divBtnCanvas")

let btnEnregistrer = ""
let btnAnnuler = ""

let newPic = ''


import { StaticCanvas } from 'https://cdn.jsdelivr.net/npm/fabric@6.6.1/dist/src/canvas/StaticCanvas.mjs'
import { FabricText } from 'https://cdn.jsdelivr.net/npm/fabric@6.6.1/dist/src/shapes/Text/Text.mjs'

const canvas3 = new StaticCanvas();
const helloWorld = new FabricText('Hello world!');
canvas3.add(helloWorld);
canvas3.centerObject(helloWorld);
canvasContainer.appendChild(canvas3.getElement());


const previousDiag = document.querySelector('.previous-diag')


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

const database = getDatabase(app)

const dbRef = ref(database, 'diagsImage');



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
  const distanceRef = ref(database, `diagsImage`);
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
        //removeFirebase(val.userId, eventi)
      })
  })
})

  
  // AJOUTER LES ELEMENTS DANS LA BDD
  function addFirebase(userId, name, imageUrl) {
    set(ref(database, `diagsImage/image${userId}`) , {
      userId: userId,
      username: name,
      imageUrl : imageUrl
    });
    console.log("Un nouveau diag est ajouté")
}

function removeFirebase(uId, e){
  if(e === `image-${uId}`){
    remove(ref(database, `diagsImage/image${uId}`))
    console.log('Le diag est bien supprimé')
  }else{
    console.log("une erreur lors de la suppression")
  }
}
   
  
// RÉCUPÉRER LES ELEMENT DE LA BDD
async function readData() {
  const snapshot = await get(ref(database, `diagsImage`));
  const data = await snapshot.val();
  // data containe the value that is Read from Database
}
readData()


// Variables globales
const ctx = canvas.getContext('2d', { alpha: false });

// Fonction d'initialisation
function initCanvas() {
    if (!canvas) {
        console.error('Canvas non trouvé');
        return;
    }
    ctx = canvas.getContext('2d', { alpha: false });
}

// Fonction pour afficher l'interface d'édition
function showEditInterface() {
    // Afficher le conteneur d'édition
    const editorContainer = document.querySelector('.editor-container');
    editorContainer.style.display = 'flex';
    editorContainer.classList.add('active');
    
    // Afficher le canvas et son conteneur
    const canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.style.display = 'flex';
    canvas.style.display = 'block';
    
    // Afficher la toolbar
    const toolbar = document.querySelector('.toolbar');
    toolbar.style.display = 'flex';
    toolbar.classList.remove('hidden');
    
    // Masquer l'interface principale
    const toolElement = document.querySelector('.tool');
    toolElement.classList.add('hidden');
    
    // Initialiser les événements de dessin
    initDrawingEvents();
    
    console.log('Interface d\'édition affichée avec événements de dessin'); // Debug
}

// Modifier la fonction imageFromInuptToCanvas
function imageFromInuptToCanvas() {
    if (!canvas) {
        console.error('Canvas non trouvé');
        return;
    }

    console.log('Début du traitement de l\'image'); // Debug
    
    var file = document.getElementById('get-photo').files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        console.log('Image chargée'); // Debug
        var image = new Image();
        
        image.onload = () => {
            console.log('Dimensions image:', image.width, image.height); // Debug
            
            // Réinitialiser l'état
            shapes = [];
            currentShape = null;
            selectedShape = null;
            isDrawing = false;
            
            // Configurer et afficher l'interface
            setupCanvas(image);
            showEditInterface();
        };
        
        image.src = e.target.result;
    }
    
    reader.readAsDataURL(file);
}

// Remplaçons tous les gestionnaires existants par un seul
document.addEventListener('DOMContentLoaded', function() {
    const takePictureBtn = document.getElementById('takePicture');
    const fileInput = document.getElementById('get-photo');

    // Supprimer les anciens écouteurs d'événements s'ils existent
    takePictureBtn.replaceWith(takePictureBtn.cloneNode(true));
    fileInput.replaceWith(fileInput.cloneNode(true));

    // Récupérer les nouveaux éléments
    const newTakePictureBtn = document.getElementById('takePicture');
    const newFileInput = document.getElementById('get-photo');

    // Ajouter les nouveaux écouteurs
    newTakePictureBtn.addEventListener('click', function() {
        newFileInput.click();
    });

    newFileInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            console.log('Fichier sélectionné'); // Debug
            imageFromInuptToCanvas();
        }
    });
});



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
// Render Image on Canva
function setupCanvas(image) {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    
    // Calculer les dimensions optimales
    const { displayWidth, displayHeight } = calculateOptimalDimensions(
        naturalWidth, 
        naturalHeight
    );
    
    // Configurer le canvas
    configureCanvas(
        naturalWidth, 
        naturalHeight, 
        displayWidth, 
        displayHeight, 
        image
    );
}

function calculateOptimalDimensions(naturalWidth, naturalHeight) {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.8;
    
    let displayWidth = naturalWidth;
    let displayHeight = naturalHeight;
    
    // Calculer le ratio tout en préservant les proportions
    const ratio = Math.min(
        maxWidth / naturalWidth,
        maxHeight / naturalHeight
    );
    
    if (ratio < 1) {
        displayWidth = naturalWidth * ratio;
        displayHeight = naturalHeight * ratio;
    }
    
    return { displayWidth, displayHeight };
}

function configureCanvas(naturalWidth, naturalHeight, displayWidth, displayHeight, image) {
    const ctx = canvas.getContext('2d', { alpha: false });
    
    // Définir les dimensions réelles du canvas
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    
    // Appliquer les dimensions d'affichage via CSS
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;
    
    // Configurer le contexte
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Dessiner l'image
    ctx.drawImage(image, 0, 0, naturalWidth, naturalHeight);
    
    // Sauvegarder l'URL de l'image
    image_data_url = canvas.toDataURL('image/jpeg', 1.0);
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

function createBtnCanvas() {
    // Nettoyer les boutons existants d'abord
    divBtnCanvas.innerHTML = '';
    
    // Créer les nouveaux boutons
    createBtnEnregistrer();
    createBtnAnnuler();
}

function removeBtnCanvas(){
  btnEnregistrer.remove()  // Changed from divBtnCanvas.remove()
  btnAnnuler.remove()      // Changed from divBtnCanvas.remove()
}


let intVal = []
function render(){
  const distanceRef = ref(database, `diagsImage`);
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

const rect = canvas.getBoundingClientRect();

let startX, startY, endX, endY;


let rectangleInfo = {
    points: [],
    isSelected: false,
    selectedHandle: -1
};

let isDrawing = false;

// Variables globales
let currentShape = null;
let selectedShape = null;
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

// Variables globales supplémentaires
let currentColor = '#FF0000'; // Couleur par défaut
let angleInfo = {
    points: [],
    isSelected: false
};

// Fonction pour définir la couleur
window.setColor = function(color) {
    currentColor = color;
};

// Modifier les fonctions de dessin pour accepter un contexte personnalisé
function drawRectangle(points, isSelected = false, context = ctx) {
  if (!points || points.length !== 4) return;
  
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  points.forEach(point => {
      context.lineTo(point.x, point.y);
  });
  context.closePath();
  
  context.strokeStyle = isSelected ? '#FF0000' : currentColor;
  context.lineWidth = 2;
  context.stroke();

  if (isSelected) {
      points.forEach(point => {
          drawHandle(point.x, point.y, context);
      });
  }
}

// Fonction pour dessiner une poignée
function drawHandle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Fonction pour dessiner une flèche
function drawArrow(startX, startY, endX, endY, isSelected = false, context = ctx) {
  const headLength = 20;
  const angle = Math.atan2(endY - startY, endX - startX);
  
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.strokeStyle = isSelected ? '#FF0000' : currentColor;
  context.lineWidth = 2;
  context.stroke();
  
  context.beginPath();
  context.moveTo(endX, endY);
  context.lineTo(endX - headLength * Math.cos(angle - Math.PI / 6),
                 endY - headLength * Math.sin(angle - Math.PI / 6));
  context.moveTo(endX, endY);
  context.lineTo(endX - headLength * Math.cos(angle + Math.PI / 6),
                 endY - headLength * Math.sin(angle + Math.PI / 6));
  context.stroke();
}

// Fonction pour redessiner le canvas
function redrawCanvas() {
    if (!ctx) return;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redessiner l'image de fond si elle existe
    if (image_data_url) {
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Redessiner toutes les formes
            shapes.forEach(shape => {
                if (shape.type === 'rectangle') {
                    drawRectangle(shape.points, shape.isSelected);
                } else if (shape.type === 'arrow') {
                    drawArrow(shape.startX, shape.startY, shape.endX, shape.endY, shape.isSelected);
                } else if (shape.type === 'angle') {
                    drawAngle(shape.points, shape.isSelected);
                }
            });
        };
        img.src = image_data_url;
    }
}

// Fonction pour dessiner un angle
function drawAngle(points, isSelected = false, context = ctx) {
  if (!points || points.length !== 3) return;
  
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  context.lineTo(points[2].x, points[2].y);
  context.lineTo(points[1].x, points[1].y);
  
  context.strokeStyle = isSelected ? '#FF0000' : currentColor;
  context.lineWidth = 2;
  context.stroke();
  
  if (isSelected) {
      points.forEach(point => {
          drawHandle(point.x, point.y, context);
      });
  }
}

// Fonction pour sélectionner l'outil
window.setShape = function(shape) {
    // Réinitialiser l'état précédent
    currentShape = shape;
    isDrawing = false;
    rectangleInfo.points = [];
    rectangleInfo.isSelected = false;
    rectangleInfo.selectedHandle = -1;
    
    // Gestion visuelle des boutons
    document.querySelectorAll('.tool-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedButton = document.querySelector(`.tool-button[onclick*="${shape}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
    
    // Réinitialiser le canvas si nécessaire
    redrawCanvas();
};

// Modifier la fonction cancelEdit
window.cancelEdit = function() {
    // Réinitialiser les variables
    currentShape = null;
    selectedShape = null;
    shapes = [];
    isDrawing = false;
    image_data_url = null;
    
    // Masquer l'éditeur complet
    const editorContainer = document.querySelector('.editor-container');
    if (editorContainer) {
        editorContainer.style.display = 'none';
        editorContainer.classList.remove('active');
    }
    
    // Réinitialiser le canvas
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
    }
    
    // Réinitialiser l'input file
    const fileInput = document.getElementById('get-photo');
    if (fileInput) {
        fileInput.value = '';
    }
    
    // Réafficher l'interface principale
    const toolElement = document.querySelector('.tool');
    if (toolElement) {
        toolElement.style.display = 'block';
        toolElement.classList.remove('hidden');
    }
    
    // Masquer la toolbar
    const toolbar = document.querySelector('.toolbar');
    if (toolbar) {
        toolbar.style.display = 'none';
        toolbar.classList.add('hidden');
    }

    // Masquer le conteneur du canvas
    const canvasContainer = document.querySelector('.canvas-container');
    if (canvasContainer) {
        canvasContainer.style.display = 'none';
    }
    
    console.log('Edition annulée et interface réinitialisée'); // Debug
};

// S'assurer que la fonction est disponible immédiatement
if (typeof window.cancelEdit === 'undefined') {
    console.log('Initialisation de cancelEdit'); // Debug
}

// Modifier le HTML pour utiliser window.setShape et window.deleteSelectedShape
document.addEventListener('DOMContentLoaded', function() {
    const toolbar = document.querySelector('.toolbar');
    
    toolbar.innerHTML = `
        <button class="tool-button" onclick="window.setShape('arrow')">
            <i class="fas fa-arrow-right"></i>
            <span>Flèche</span>
        </button>
        <button class="tool-button" onclick="window.setShape('rectangle')">
            <i class="fas fa-square"></i>
            <span>Surface</span>
        </button>
        <button class="tool-button" onclick="window.setShape('angle')">
            <i class="fas fa-ruler-combined"></i>
            <span>Angle</span>
        </button>
        <button class="tool-button" onclick="window.setShape('text')">
            <i class="fas fa-font"></i>
            <span>Texte</span>
        </button>
        <button class="tool-button delete-button" onclick="window.deleteSelectedShape()">
            <i class="fas fa-trash"></i>
            <span>Supprimer</span>
        </button>
        <button class="tool-button save-button" onclick="window.saveCanvas()">
            <i class="fas fa-save"></i>
            <span>Enregistrer</span>
        </button>
        <button class="tool-button back-button" onclick="window.cancelEdit()">
            <i class="fas fa-times"></i>
            <span>Annuler</span>
        </button>
    `;
});

// Fonction pour sauvegarder l'état du canvas
window.saveCanvas = async function() {
  try {
      // Capturer l'état actuel du canvas avec les formes
      const canvasWithShapes = document.createElement('canvas');
      const tempCtx = canvasWithShapes.getContext('2d');
      canvasWithShapes.width = canvas.width;
      canvasWithShapes.height = canvas.height;

      // Dessiner l'image de base
      const baseImage = new Image();
      await new Promise((resolve, reject) => {
          baseImage.onload = resolve;
          baseImage.onerror = reject;
          baseImage.src = image_data_url;
      });
      tempCtx.drawImage(baseImage, 0, 0);

      // Dessiner toutes les formes
      shapes.forEach(shape => {
          if (shape.type === 'rectangle') {
              drawRectangle(shape.points, false, tempCtx);
          } else if (shape.type === 'arrow') {
              drawArrow(shape.startX, shape.startY, shape.endX, shape.endY, false, tempCtx);
          } else if (shape.type === 'angle') {
              drawAngle(shape.points, false, tempCtx);
          }
      });

      // Créer l'objet de données à sauvegarder
      const canvasData = {
          imageUrl: canvasWithShapes.toDataURL('image/jpeg', 1.0),
          shapes: shapes.map(shape => ({
              type: shape.type,
              ...shape,
              isSelected: false
          })),
          timestamp: new Date().toISOString()
      };

      // Sauvegarder dans Firebase
      const newImageRef = push(ref(database, 'diagsImage'));
      await set(newImageRef, canvasData);

      console.log('Canvas sauvegardé avec succès');
      showSaveFeedback(true);

      // Retourner à l'interface principale après un court délai
      setTimeout(() => {
          window.cancelEdit();
      }, 1000);

  } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showSaveFeedback(false);
  }
};

// Fonction pour charger une image existante
window.loadSavedCanvas = function(imageId) {
    // Récupérer les données depuis Firebase
    get(ref(database, `diagsImage/${imageId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                
                // Charger l'image
                const img = new Image();
                img.onload = function() {
                    // Configurer le canvas
                    setupCanvas(img);
                    
                    // Restaurer les formes
                    shapes = data.shapes;
                    
                    // Afficher l'interface d'édition
                    showEditInterface();
                    
                    // Redessiner le canvas
                    redrawCanvas();
                };
                img.src = data.imageUrl;
                image_data_url = data.imageUrl;
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement:', error);
        });
};

// Feedback visuel pour la sauvegarde
function showSaveFeedback(success) {
    const saveButton = document.querySelector('.save-button');
    if (saveButton) {
        saveButton.classList.add(success ? 'save-success' : 'save-error');
        setTimeout(() => {
            saveButton.classList.remove('save-success', 'save-error');
        }, 2000);
    }
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
  if (!clickedOnShape && currentShape) {
      isDrawing = true;
      startDrawing(x, y);
  }

  // Redessiner le canvas
  redrawCanvas();
}


function handleMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Vérifier d'abord si on clique sur une forme existante
    let clickedOnShape = false;
    
    for (let shape of shapes) {
        if (isPointInShape(mouseX, mouseY, shape)) {
            updateSelection(shape);
            clickedOnShape = true;
            break;
        }
    }

    if (!clickedOnShape) {
        updateSelection(null);
        // Logique de dessin
        if (currentShape) {
            isDrawing = true;
            if (currentShape === 'rectangle') {
                rectangleInfo.points = [
                    {x: mouseX, y: mouseY}, // top-left
                    {x: mouseX, y: mouseY}, // top-right
                    {x: mouseX, y: mouseY}, // bottom-right
                    {x: mouseX, y: mouseY}  // bottom-left
                ];
            } else if (currentShape === 'arrow') {
                startX = mouseX;
                startY = mouseY;
            } else if (currentShape === 'angle') {
                angleInfo.points = [
                    {x: mouseX, y: mouseY},
                    {x: mouseX, y: mouseY},
                    {x: mouseX, y: mouseY}
                ];
            }
        }
    }
}

function handleMouseMove(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Effacer et redessiner l'image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawCanvas();

    if (currentShape === 'rectangle') {
        rectangleInfo.points[1].x = mouseX;
        rectangleInfo.points[2].x = mouseX;
        rectangleInfo.points[2].y = mouseY;
        rectangleInfo.points[3].y = mouseY;
        drawRectangle(rectangleInfo.points);
    } else if (currentShape === 'arrow') {
        drawArrow(startX, startY, mouseX, mouseY);
    } else if (currentShape === 'angle') {
        angleInfo.points[1] = {x: mouseX, y: mouseY};
        drawAngle(angleInfo.points);
    }
}

function handleMouseUp(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (currentShape) {
        const newShape = {
            type: currentShape,
            isSelected: false
        };

        if (currentShape === 'rectangle') {
            newShape.points = [...rectangleInfo.points];
        } else if (currentShape === 'arrow') {
            newShape.startX = startX;
            newShape.startY = startY;
            newShape.endX = mouseX;
            newShape.endY = mouseY;
        } else if (currentShape === 'angle') {
            newShape.points = [...angleInfo.points];
        }

        shapes.push(newShape);
    }

    isDrawing = false;
    redrawCanvas();
}

// Gestionnaires d'événements pour le dessin
function initDrawingEvents() {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
}

// Ajout des variables pour gérer l'interface
const toolSelector = document.querySelector('.tool');
const toolbar = document.querySelector('.toolbar');

function hideEditInterface() {
    // Réinitialiser l'interface
    toolSelector.classList.remove('hidden');
    toolbar.classList.add('hidden');
    canvas.classList.add('hidden');
    removeBtnCanvas();
}

// Gestionnaire pour l'input file
document.getElementById('get-photo').addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        // Appeler la fonction de traitement d'image
        imageFromInuptToCanvas();
        // Afficher l'interface d'édition
        showEditInterface();
    }
});

// Gestionnaire pour le bouton "Nouvelle superficie"
document.getElementById('takePicture').addEventListener('click', function() {
    document.getElementById('get-photo').click();
});

// Mettre à jour la fonction qui gère la sélection des formes
function updateSelection(shape) {
    if (selectedShape) {
        selectedShape.isSelected = false;
    }
    
    selectedShape = shape;
    if (shape) {
        shape.isSelected = true;
    }
    
    // Mettre à jour l'état du bouton de suppression
    const deleteButton = document.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.disabled = !selectedShape;
    }
    
    redrawCanvas();
}

// Fonction pour supprimer une forme sélectionnée
window.deleteSelectedShape = function() {
    console.log('Tentative de suppression...'); // Debug
    console.log('Forme sélectionnée:', selectedShape); // Debug
    console.log('Nombre de formes avant:', shapes.length); // Debug

    if (selectedShape) {
        // Trouver l'index de la forme sélectionnée
        const index = shapes.findIndex(shape => shape === selectedShape);
        
        if (index !== -1) {
            // Supprimer la forme du tableau
            shapes.splice(index, 1);
            selectedShape = null;
            
            // Redessiner le canvas
            redrawCanvas();
            
            console.log('Forme supprimée. Nombre de formes restantes:', shapes.length); // Debug
        }
    } else {
        console.log('Aucune forme sélectionnée'); // Debug
    }
};

// Ajouter un retour visuel pour la suppression
function showDeleteFeedback() {
    const deleteButton = document.querySelector('.delete-button');
    if (deleteButton) {
        deleteButton.classList.add('delete-feedback');
        setTimeout(() => {
            deleteButton.classList.remove('delete-feedback');
        }, 200);
    }
}







