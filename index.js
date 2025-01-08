import { v4 as uuidv4 } from './node_modules/uuid/dist/esm-browser/index.js';




const takePicture = document.getElementById('takePicture');

let video2 = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
// let camera_button = document.querySelector("#start-camera");
// let click_button = document.querySelector("#click-photo");

const closeCameraBtn = document.getElementById('close-camera-button')
const closeCanvasBtn = document.getElementById('close-canvas-button')


let stream = null; // Variable pour stocker le stream

// const video = document.createElement('video');
// document.body.appendChild(video);


const constraints = {
    video: {
        facingMode: 'environment'
    },
    audio: false
};

const newMeasur = {
    "id" : uuidv4(),
    "picture" : "canvas",
    "mesure" : 43,
}

closeCameraBtn.addEventListener('click', function(){
        video2.classList.add('camera-hidden')
        closeCameraBtn.classList.add('camera-hidden')
        stream.getTracks().forEach(track => track.stop());
        video2.srcObject = null;
        stream = null;
        video2.style.display = 'none'
        takePicture.innerHTML = `<i class="fa-solid fa-plus"></i> Prendre une photo`;
})


closeCanvasBtn.addEventListener('click', function(){
        closeCanvasBtn.classList.remove('btn-tools-camera')
        closeCanvasBtn.classList.add('camera-hidden') // Retirer hidden quand fullscreen
        canvas.classList.remove('camera-fullscreen')
        canvas.classList.add('camera-hidden') // Retirer hidden quand fullscreen
})


takePicture.addEventListener('click', function(){
    console.log(ne)
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
