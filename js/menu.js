
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d');


// Load  images
const bgImg = new Image();
bgImg.src = 'title bg.png';

const titleImg = new Image();
titleImg.src = 'title.png';

const startImg = new Image();
startImg.src = 'js start.png';

let time = 0;

function animate() {
    time += 0.05; // Overall speed of the "breathing"
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Background (Static)
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // 2. Draw Title Logo (Squash & Stretch)
    // We use a sine wave to subtly change the width and height
    let titleSquash = Math.sin(time) * 0.03; 
    let titleBob = Math.sin(time * 0.8) * 10; // Floating up/down 10px

    ctx.save();
    ctx.translate(canvas.width / 2, 150 + titleBob);
    ctx.scale(1 + titleSquash, 1 - titleSquash); // Width grows, height shrinks
    ctx.drawImage(titleImg, -titleImg.width / 2, -titleImg.height / 2);
    ctx.restore();

    // 3. Draw "Press Start" Paper (Lazy Floating)
    // We use a different speed (0.6) so it doesn't move perfectly with the logo
    let paperBob = Math.sin(time * 0.6) * 15; 
    let paperRotation = Math.sin(time * 0.4) * 0.02; // Tiny wiggle

    ctx.save();
    ctx.translate(canvas.width / 2, 400 + paperBob);
    ctx.rotate(paperRotation);
    
    // Pulse the opacity of the "Press Start" paper
    ctx.globalAlpha = 0.8 + Math.sin(time * 2) * 0.2; 
    
    ctx.drawImage(startImg, -startImg.width / 2, -startImg.height / 2);
    ctx.restore();
    ctx.globalAlpha = 1.0; // Reset alpha

    requestAnimationFrame(animate);
}

// Start the loop once images are loaded
const images = [bgImg, titleImg, startImg];
let loadedCount = 0;

function checkImages() {
    loadedCount++;
    if (loadedCount === images.length) {
        animate();
    }
}

bgImg.onload = checkImages;
titleImg.onload = checkImages;
startImg.onload = checkImages;


