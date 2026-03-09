const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load images
const bgImg = new Image();
bgImg.src = 'title bg.png';

const titleImg = new Image();
titleImg.src = 'title.png';

const start = new Image(); // Using 'start' as requested
start.src = 'start.png';

let time = 0;

function animate() {
    time += 0.05; 
    
    // Clear the canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Background (Stretched to fill 960x576)
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // 2. BIGGER TITLE LOGO (800x450)
    let titleWidth = 800;  
    let titleHeight = 450; 
    let titleSquash = Math.sin(time) * 0.02; 
    let titleBob = Math.sin(time * 0.8) * 8;

    ctx.save();
    // Positioned slightly higher to make room for REBIRTH text and paper
    ctx.translate(canvas.width / 2, 190 + titleBob);
    ctx.scale(1 + titleSquash, 1 - titleSquash);
    // Draw centered using half-width and half-height offsets
    ctx.drawImage(titleImg, -titleWidth / 2, -titleHeight / 2, titleWidth, titleHeight);
    ctx.restore();

    // 3. BIGGER "PRESS START" PAPER (450x550)
    let paperWidth = 450;  
    let paperHeight = 550; 
    let paperBob = Math.sin(time * 0.6) * 12; 
    let paperRotation = Math.sin(time * 0.4) * 0.02;

    ctx.save();
    // LOWERED TO Y: 530 so it hangs below the logo and reveals "REBIRTH"
    ctx.translate(canvas.width / 2, 530 + paperBob);
    ctx.rotate(paperRotation);
    
    // Pulse the opacity (breathing effect)
    ctx.globalAlpha = 0.85 + Math.sin(time * 2) * 0.15; 
    
    // Draw centered and scaled up
    ctx.drawImage(start, -paperWidth / 2, -paperHeight / 2, paperWidth, paperHeight);
    ctx.restore();
    ctx.globalAlpha = 1.0; 

    requestAnimationFrame(animate);
}

// Preloader: Start animation only after all 3 images load
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
        // Redirects to your floors file
        window.location.href = "indexx.html"; // Update to your actual game filename
    }
});
