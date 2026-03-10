// 1. Setup Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 2. Asset Paths (ENSURE folder names match your GitHub structure)
const assets = {
    background: 'title bg.png',
    slot1: 'file1.png',
    slot2: 'file2.png',
    slot3: 'file3.png'
};

const images = {};
let loadedCount = 0;
const totalAssets = Object.keys(assets).length;

// 3. Slot Data - Using fixed width/height for stability
const slots = [
    { id: 0, imgKey: 'slot1', x: 80,  y: 150, w: 220, h: 280 },
    { id: 1, imgKey: 'slot2', x: 370, y: 150, w: 220, h: 280 },
    { id: 2, imgKey: 'slot3', x: 660, y: 150, w: 220, h: 280 }
];

let selectedSlot = 0;
let pulseAngle = 0;

// ERROR LOG (Since console is blocked)
window.onerror = (msg, url, line) => {
    const err = document.createElement('div');
    err.style = "position:fixed;top:0;left:0;background:red;color:white;padding:10px;z-index:9999;";
    err.innerHTML = `ERROR: ${msg} <br> LINE: ${line}`;
    document.body.appendChild(err);
};

// 4. Load Assets
function loadAssets() {
    for (let key in assets) {
        images[key] = new Image();
        images[key].src = assets[key];
        images[key].onload = () => {
            loadedCount++;
            if (loadedCount === totalAssets) animate();
        };
        images[key].onerror = () => {
            alert("CANNOT FIND FILE: " + assets[key] + "\nCheck capitalization and folders!");
        };
    }
}

// 5. Draw Function
function draw() {
    // Clear everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Background First
    if (images.background) {
        ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    }

    pulseAngle += 0.05; // Slower, smoother pulse

    slots.forEach((slot, index) => {
        const sprite = images[slot.imgKey];
        if (!sprite) return;

        let drawX = slot.x;
        let drawY = slot.y;
        let drawW = slot.w;
        let drawH = slot.h;

        // AUTHENTIC ISAAC EFFECT: Selected slot pulses and shakes
        if (index === selectedSlot) {
            // Pulsing (Grow/Shrink)
            const pulse = Math.sin(pulseAngle) * 10; // Grows by up to 10 pixels
            drawW += pulse;
            drawH += pulse;
            
            // Re-center so it grows from the middle
            drawX -= pulse / 2;
            drawY -= pulse / 2;

            // Shaking (Hand-drawn jitter)
            drawX += (Math.random() - 0.5) * 4;
            drawY += (Math.random() - 0.5) * 4;
        }

        ctx.drawImage(sprite, drawX, drawY, drawW, drawH);
    });
}

// 6. Animation & Controls
function animate() {
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") selectedSlot = (selectedSlot + 1) % slots.length;
    if (e.key === "ArrowLeft") selectedSlot = (selectedSlot - 1 + slots.length) % slots.length;
});

loadAssets();
