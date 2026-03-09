const canvas = document.getElementById('canvas'); // Matches your HTML ID
const ctx = canvas.getContext('2d');

// Load images
const bgImg = new Image();
bgImg.src = 'title bg.png';

const titleImg = new Image();
titleImg.src = 'title.png';

const start = new Image(); // The paper is called 'start'
start.src = 'js start.png';

let time = 0;

function animate() {
    time += 0.05; 
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Background (Fills the 960x576 canvas)
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // 2. Draw Title Logo (Centered & Scaled)
    let titleWidth = 700;  // Force it bigger
    let titleHeight = 350; 
    let titleSquash = Math.sin(time) * 0.03; 
    let titleBob = Math.sin(time * 0.8) * 10;

    ctx.save();
    ctx.translate(canvas.width / 2, 180 + titleBob);
    ctx.scale(1 + titleSquash, 1 - titleSquash);
    // Draw centered: x and y are -half of the width and height
    ctx.drawImage(titleImg, -titleWidth / 2, -titleHeight / 2, titleWidth, titleHeight);
    ctx.restore();

    // 3. Draw "Press Start" Paper (Centered & BIGGER)
    let paperWidth = 350;  // Fixed the "small asf" issue
    let paperHeight = 400; 
    let paperBob = Math.sin(time * 0.6) * 15; 
    let paperRotation = Math.sin(time * 0.4) * 0.02;

    ctx.save();
    ctx.translate(canvas.width / 2, 430 + paperBob);
    ctx.rotate(paperRotation);
    
    // Pulse the opacity
    ctx.globalAlpha = 0.8 + Math.sin(time * 2) * 0.2; 
    
    // Draw centered and scaled
    ctx.drawImage(start, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
    ctx.restore();
    ctx.globalAlpha = 1.0; 

    requestAnimationFrame(animate);
}

// Ensure all images are loaded before starting
let loaded = 0;
[bgImg, titleImg, start].forEach(img => {
    img.onload = () => {
        loaded++;
        if (loaded === 3) animate();
    };
});

// Handle the "Start" transition
window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
        // Change this to your actual game file name
        window.location.href = "game.html"; 
    }
});
