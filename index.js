// Request access to the user's camera

const takePicture = document.getElementById('takePicture');



let stream = null; // Variable pour stocker le stream

const video = document.createElement('video');
document.body.appendChild(video);

const constraints = {
    video: {
        facingMode: 'environment'
    },
    audio: false
};

takePicture.addEventListener('click', function(){
    if (!stream) {
        // Ouvrir la caméra
        navigator.mediaDevices.getUserMedia(constraints)
            .then((videoStream) => {
                stream = videoStream; // Sauvegarder la référence du stream
                video.srcObject = stream;
                video.play();
                takePicture.textContent = 'Arrêter la caméra';
            })
            .catch((error) => {
                console.error("Erreur d'accès à la caméra:", error);
            });
    } else {
        // Fermer la caméra
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
        takePicture.textContent = 'Ouvrir la caméra';
    }
});







// let stream = null;

// takePicture.addEventListener('click', function(){
//     // Si la caméra n'est pas déjà active
//     if (!stream) {
//         navigator.mediaDevices.getUserMedia({ video: true })
//         .then((videoStream) => {
//             stream = videoStream;
//             const video = document.getElementById('camera');
//             video.srcObject = stream;
//             video.play();
//             // Changer le texte du bouton
//             takePicture.textContent = 'Arrêter la caméra';
//         })
//         .catch((error) => {
//             console.error("Error accessing the camera: ", error);
//         });
//     } else {
//         // Si la caméra est active, on l'arrête
//         stream.getTracks().forEach(track => track.stop());
//         const video = document.getElementById('camera');
//         video.srcObject = null;
//         stream = null;
//         // Remettre le texte original du bouton
//         takePicture.textContent = 'Ouvrir la caméra';
//     }
// });
