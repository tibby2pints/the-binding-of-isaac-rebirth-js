const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d');

// Load images
const bgImg = new Image();
bgImg.src = 'title bg.png';

const titleImg = new Image();
titleImg.src = 'title.png';

const start = new Image(); 
start.src = 'js start.png';

let time = 0;

function animate() {
    time += 0.05; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Background (Stretched to 960x576)
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // 2. LOGO: Slightly smaller to give the paper room
    let titleWidth = 750;  
    let titleHeight = 420; 
    let titleBob = Math.sin(time * 0.8) * 8;
    let titleSquash = Math.sin(time) * 0.02;

    ctx.save();
    // Positioned HIGHER (150) to make space for "REBIRTH" and paper
    ctx.translate(canvas.width / 2, 150 + titleBob);
    ctx.scale(1 + titleSquash, 1 - titleSquash);
    ctx.drawImage(titleImg, -titleWidth / 2, -titleHeight / 2, titleWidth, titleHeight);
    ctx.restore();

    // 3. PAPER: Balanced height to prevent cutting off the bottom
    let paperWidth = 380;  
    let paperHeight = 480; 
    let paperBob = Math.sin(time * 0.6) * 12; 
    let paperRotation = Math.sin(time * 0.4) * 0.02;

    ctx.save();
    // Y: 490 is the "Sweet Spot" for your 576px tall canvas
    // It sits below the "REBIRTH" text but keeps Isaac's face on-screen
    ctx.translate(canvas.width / 2, 490 + paperBob);
    ctx.rotate(paperRotation);
    
    // Pulse the opacity (breathing effect)
    ctx.globalAlpha = 0.85 + Math.sin(time * 2) * 0.15; 
    
    // Draw centered and scaled
    ctx.drawImage(start, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
    ctx.restore();
    ctx.globalAlpha = 1.0; 

    requestAnimationFrame(animate);
}

// Preloader: Wait for all 3 images
let loadedCount = 0;
const assets = [bgImg, titleImg, start];
assets.forEach(img => {
    img.onload = () => {
        loadedCount++;
        if (loadedCount === assets.length) animate();
    };
});

// Handle the Start transition (Enter or Space)
window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.code === "Space") {
        // Change this to the actual HTML filename of your floors
        window.location.href = "index.html"; 
    }
});
