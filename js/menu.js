
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d');


// Load  images
const bgImg = new Image();
bgImg.src = 'title bg.png';

const titleImg = new Image();
titleImg.src = 'title.png';

const startImg = new Image();
startImg.src = 'start.png';

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
    // Increase these numbers to make the paper bigger!
    let paperWidth = 300;  // Try 300-400 for that Rebirth look
    let paperHeight = 350; 

    let paperBob = Math.sin(time * 0.6) * 15; 
    let paperRotation = Math.sin(time * 0.4) * 0.05; // Slightly more wiggle

    ctx.save();
    // Move to the horizontal center (canvas.width / 2) 
    // and lower down (around 420px)
    ctx.translate(canvas.width / 2, 420 + paperBob);
    ctx.rotate(paperRotation);

    // Pulse the opacity
    ctx.globalAlpha = 0.8 + Math.sin(time * 2) * 0.2; 

    // DRAWING: Use the 'start' variable but force the new width/height
    // We use -width/2 so it stays perfectly centered on our translate point
    ctx.drawImage(start, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);

    ctx.restore();
    ctx.globalAlpha = 1.0; // Reset alpha for the next frame


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


