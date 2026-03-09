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

    // 2. LOGO (Top Section)
    // Sized to be large but leave a gap for the paper
    let titleWidth = 750;  
    let titleHeight = 285; 
    let titleBob = Math.sin(time * 0.8) * 5;

    ctx.save();
    // Put it at Y: 180 (Higher up)
    ctx.translate(canvas.width / 2, 180 + titleBob);
    ctx.scale(1 + Math.sin(time) * 0.02, 1 - Math.sin(time) * 0.02);
    ctx.drawImage(titleImg, -titleWidth / 2, -titleHeight / 2, titleWidth, titleHeight);
    ctx.restore();

    // 3. PRESS START PAPER (Bottom Section)
    // Sized to fit comfortably in the bottom half
    let paperWidth = 280;  
    let paperHeight = 350; 
    let paperBob = Math.sin(time * 0.6) * 10; 

    ctx.save();
    // Put it at Y: 430 (Lower down, no overlap with "REBIRTH")
    ctx.translate(canvas.width / 2, 430 + paperBob);
    ctx.rotate(Math.sin(time * 0.4) * 0.02);
    
    // Smooth breathing opacity
    ctx.globalAlpha = 0.8 + Math.sin(time * 2) * 0.2; 
    ctx.drawImage(start, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
    ctx.restore();
    ctx.globalAlpha = 1.0; 

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
