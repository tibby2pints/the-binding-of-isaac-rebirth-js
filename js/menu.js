const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d');

// Load images
const bgImg = new Image();
bgImg.src = 'title bg.png';

const titleImg = new Image();
titleImg.src = 'title.png';

const start = new Image(); 
start.src = 'start.png';

let time = 0;

function animate() {
    time += 0.05; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Background (Fills 960x576)
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // 2. PRESS START PAPER (Drawn first so it stays BEHIND the logo)
    let paperWidth = 420;  
    let paperHeight = 525; 

    ctx.save();
    // Position fixed at 430 with no paperBob or rotation variables
    ctx.translate(canvas.width / 2, 490);
    // Fixed opacity at 1.0 (no pulsing)
    ctx.globalAlpha = 1.0; 
    ctx.drawImage(start, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
    ctx.restore();

    // 3. LOGO (Drawn last so it overlaps the "Press Start" paper)
    let titleWidth = 750;  
    let titleHeight = 285; 
    let titleBob = Math.sin(time * 0.8) * 5;

    ctx.save();
    ctx.translate(canvas.width / 2, 180 + titleBob);
    ctx.scale(1 + Math.sin(time) * 0.02, 1 - Math.sin(time) * 0.02);
    ctx.drawImage(titleImg, -titleWidth / 2, -titleHeight / 2, titleWidth, titleHeight);
    ctx.restore();

    requestAnimationFrame(animate);
}

// Preloader
let loaded = 0;
[bgImg, titleImg, start].forEach(img => {
    img.onload = () => {
        loaded++;
        if (loaded === 3) animate();
    };
});

// Start Transition
window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
        window.location.href = "indexx.html"; 
    }
});
