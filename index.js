import { v4 as uuidv4 } from 'uuid';

const fileInput = document.getElementById("get-photo");  // use input file id here
const textinput = document.getElementById("takePicture"); //Change the browser title
const canvas = document.querySelector("#canvas");

let btnEnregistrer = ""
let btnAnnuler = ""

const addBtn = document.getElementById('add-btn')

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

const dbRef = ref(db);

const userId = uuidv4(); 
const nameTest = `S4h${userId}`
const mailTest = `test${userId}@test.com`
//const imgTest = getUnsplashImage()


function getSnapshot(){
    get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
}
getSnapshot()

function addFirebase(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
    console.log("Un nouveau diag est ajouté")
}


function removeFirebase(userId){
    const db = getDatabase();
    remove(ref(db, 'users/' + userId))
    console.log("Un diag est supprimé")
}





//const distanceRef = ref(db, "users/" + userId + '/distance'); 02e5e815-fb1b-4155-8c64-d85157511707



// const commentsRef = ref(db, 'post-comments/' + userId)
// onValue(commentsRef, (snapchot) =>{
//     snapshotEqual.forEach((childSnapshot) =>{
//         const childKey = childSnapshot.apiKey
//         const childData = childSnapshot.val()
//     })
// }, {
//     onlyOnce: true
// })








// Partie Pour prendre photo

const takePicture = document.getElementById('takePicture');

let video2 = document.querySelector("#video");
//let canvas = document.querySelector("#canvas");
// let camera_button = document.querySelector("#start-camera");
// let click_button = document.querySelector("#click-photo");

const closeCameraBtn = document.getElementById('close-camera-button')
const closeCanvasBtn = document.getElementById('close-canvas-button')


let stream = null; // Variable pour stocker le stream

const constraints = {
    video: {
        facingMode: 'environment'
    },
    audio: false
};

// const newMeasur = {
//     "id" : uuidv4(),
//     "picture" : "canvas",
//     "mesure" : 43,
// }


// Function bouton fermeture camera ouverte
closeCameraBtn.addEventListener('click', function(){
    video2.classList.add('camera-hidden')
    closeCameraBtn.classList.add('camera-hidden')
    stream.getTracks().forEach(track => track.stop());
    video2.srcObject = null;
    stream = null;
    video2.style.display = 'none'
    takePicture.innerHTML = `<i class="fa-solid fa-plus"></i> Prendre une photo`;
})


// Function bouton fermeture Canvas ouverte
closeCanvasBtn.addEventListener('click', function(){
    closeCanvasBtn.classList.remove('btn-tools-camera')
    closeCanvasBtn.classList.add('camera-hidden') // Retirer hidden quand fullscreen
    canvas.classList.remove('camera-fullscreen')
    canvas.classList.add('camera-hidden') // Retirer hidden quand fullscreen
})












// Obtenir image unsplash API

let newPic = ''

async function getUnsplashImage(){
    try{
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=luxe+house")
        if(!res.ok){
            throw Error("L'api unsplash ne fonctionne")
        }
        const data = await res.json()
        console.log(data.urls.regular)
        newPic = data.urls.regular
        return data.urls.regular
    }catch(err){
        console.log(err)
    }
    
}


// try{
//     const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=luxe+house")
//         if(!res.ok){
//             throw Error("L'api unsplash ne fonctionne")
//         }
//         const data = await res.json()
//         console.log(data.urls.regular)
//         newPic = data.urls.regular
//         //return newPic
//     }catch(err){
//         console.log(err)
// }




// Affichage des derniers diags depuis Firebase

let cardHTML = ``
let intVal = []
function render(){
    const distanceRef = ref(db, "users/");
    onValue(distanceRef, (snapshot) => {
        // const data = snapshot.val()
        // console.log(data)
        snapshot.forEach((child) => {
            const dataKey = child.key
            const data = child.val()
            //console.log(data.profile_picture); 
            intVal.push(child.val());
            previousDiag.innerHTML +=`<div class="card">
                                          <img src="${data.profile_picture}" data-iddiag="${dataKey}">
                                      </div>
            `
        //console.log("intVal" + intVal);
        })
    })
}





            
            
function createBtnEnregistrer(){
    btnEnregistrer = document.createElement('button')
    btnEnregistrer.classList.add('tool')
    btnEnregistrer.classList.add('btnCanvas')
    btnEnregistrer.textContent = "Enregistrer"
    document.body.appendChild(btnEnregistrer)
    btnEnregistrer.style.zIndex = "1000"
}

function createBtnAnnuler(){
    btnAnnuler = document.createElement('button')
    btnAnnuler.classList.add('tool')
    btnAnnuler.classList.add('btnCanvas')
    btnAnnuler.textContent = "Annuler"
    document.body.appendChild(btnAnnuler)
    btnAnnuler.style.zIndex = "1000"
}

function createBtnCanvas(){
    createBtnEnregistrer()
    createBtnAnnuler()
}

function removeBtnCanvas(){
    document.body.removeChild(btnEnregistrer)
    document.body.removeChild(btnAnnuler)
}


addBtn.addEventListener('click', function(){
    CreateBtnCanvas()
})


let image_data_url = ""
fileInput.addEventListener('change', function(event){
    handleChange()
    const files = event.target.files;
    // Vérifier s'il y a des fichiers sélectionnés
    if (files.length > 0) {
        canvas.classList.remove('hidden')
        addFileCanvas(files[0], canvas);
        image_data_url = addFileCanvas(files[0], canvas)
        createBtnCanvas()
        btnEnregistrer.addEventListener('click', function(){
            addFirebase(userId, nameTest, mailTest, image_data_url)
            image_data_url=""
            canvas.classList.add('hidden')
            removeBtnCanvas()
            textinput.value = "+ Nouvelle superficie"
            window.location.reload()
        })
        
        btnAnnuler.addEventListener('click', function(){
            image_data_url=""
            canvas.classList.add('hidden')
            removeBtnCanvas()
            textinput.value = "+ Nouvelle superficie"
            //window.location.reload()
        })
    } else {
        console.log('Aucun fichier sélectionné');
    }
});




function addFileCanvas(file, canvas) {
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            image_data_url = canvas.toDataURL('image/jpeg');
            console.log(image_data_url)
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
    return image_data_url
}





 // canvas.addEventListener('change', function(){
    //     addFirebase(userId, nameTest, mailTest, image_data_url)
    //     image_data_url=""
    //     canvas.classList.add('camera-hidden')
    //     window.location.reload()
    // })

    // btnEnregistrer.addEventListener('click', function(){
    //     addFirebase(userId, nameTest, mailTest, image_data_url)
    //     image_data_url=""
    //     canvas.classList.add('camera-hidden')
    //     window.location.reload()
    // })





// GÉRER LE CLIC ADD SUPERFICIEL ET LE CHANGEMENT D'ÉTAT DE INPUT FILE

textinput.addEventListener('click', browseClick);

function browseClick() {
    fileInput.click();
}
// GÉRER LE CHANGEMENT DE L'ÉTAT DE INPUT FILE
function handleChange() {
    textinput.value = fileInput.value; //Value of input type button equal to value of input type file  
}



render()

















/*


// ANCIEN FILE INPUT EVENT LISTENER DANS INDEX.HTML

// Récupérer le premier fichier
                const file = files[0];
                console.log(file)
                canvas.getContext('2d')//.drawImage(imageS, 0, 0, canvas.width, canvas.height);
                const reader = new FileReader();
                reader.onload = () => {
                    const img = new Image();
                    //img.src = event.target.result;
                    //console.log(reader.result)
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        //ctx.drawImage(img, 0, 0, img.width, img.height);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        console.log(ctx)
                        image_data_url = canvas.toDataURL('image/jpeg');
                        console.log(image_data_url)
                    };
                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
                //console.log(reader)










// Function Prendre Photo bouton, avec stream caméra (OLD VERSION)


takePicture.addEventListener('click', function(){
    //getUnsplashImage()
    if (!stream) {
        // Ouvrir la caméra
        navigator.mediaDevices.getUserMedia(constraints)
        .then((videoStream) => {
            stream = videoStream; // Sauvegarder la référence du stream
            video2.srcObject = stream;
            video2.classList.remove('camera-hidden')
            video2.classList.add('camera-fullscreen')
            video2.play();
            closeCameraBtn.classList.remove('camera-hidden') // Retirer hidden quand fullscreen
            closeCameraBtn.classList.add('btn-tools-camera')
            closeCameraBtn.style.cursor = "pointer"
            takePicture.textContent = 'Prendre une photo';
            // takePicture.style.cursor = "pointer"
        })
        .catch((error) => {
            console.error("Erreur d'accès à la caméra:", error);
        });
    } else {
        // Fermer la caméra
        closeCanvasBtn.classList.remove('btn-tools-camera')
        closeCanvasBtn.classList.add('camera-hidden') // Retirer hidden quand fullscreen
        canvas.classList.remove('camera-fullscreen')
        canvas.classList.add('camera-hidden') 
        canvas.classList.remove('camera-hidden') // Retirer hidden quand fullscreen
        canvas.classList.add('camera-fullscreen')
        closeCanvasBtn.classList.remove('camera-hidden') // Retirer hidden quand fullscreen
        closeCanvasBtn.classList.add('btn-tools-camera')
        closeCanvasBtn.style.cursor = "pointer"
        console.log(canvas.classList)
        canvas.getContext('2d').drawImage(video2, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');
        video2.classList.add('camera-hidden')
        closeCameraBtn.classList.add('camera-hidden') // Remettre hidden par défaut
        closeCameraBtn.classList.remove('btn-tools-camera')
        stream.getTracks().forEach(track => track.stop());
        video2.srcObject = null;
        stream = null;
        video2.style.display = 'none'
        takePicture.innerHTML = `<i class="fa-solid fa-plus"></i> Nouvelle superficie`;
        console.log(image_data_url);
    }
});
















// const addData = document.getElementById("addData")
// addData.addEventListener('click', function(){
//     addFirebase(userId, nameTest, mailTest, newPic)

// })
// addFirebase(userId, nameTest, mailTest, newPic)


*/