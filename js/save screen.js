// 1. Setup Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 2. Asset Paths (Ensure these match your GitHub folder/file names exactly)
const assets = {
    background: 'title bg.png',
    slot1: 'file1.png',
    slot2: 'file2.png',
    slot3: 'file3.png'
};

const images = {};
let loadedCount = 0;
const totalAssets = Object.keys(assets).length;

// 3. Horizontal Slots
const slots = [
    { id: 0, imgKey: 'slot1', x: 100, y: 180, scale: 1 },
    { id: 1, imgKey: 'slot2', x: 400, y: 180, scale: 1 },
    { id: 2, imgKey: 'slot3', x: 700, y: 180, scale: 1 }
];

let selectedSlot = 0;
let pulseAngle = 0;

// Emergency on-screen error display
window.onerror = (msg, url, line) => {
    const err = document.createElement('div');
    err.style = "position:fixed;top:0;left:0;background:red;color:white;padding:10px;z-index:9999;";
    err.innerHTML = `Error: ${msg} <br> Line: ${line}`;
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
        images[key].onerror = () => alert("Missing file: " + assets[key]);
    }
}

// 5. Draw Function with "Pulsing" and "Shaking"
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (images.background) {
        ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    }

    pulseAngle += 0.1; // Speed of the pulsing

    slots.forEach((slot, index) => {
        const sprite = images[slot.imgKey];
        if (!sprite) return;

        let x = slot.x;
        let y = slot.y;
        let width = sprite.width;
        let height = sprite.height;

        if (index === selectedSlot) {
            // AUTHENTIC EFFECT: Pulsing Scale
            const pulse = Math.sin(pulseAngle) * 0.05; // 5% size change
            const scale = 1.1 + pulse; // Slightly larger when selected
            
            // Re-center for the scale
            width *= scale;
            height *= scale;
            x -= (width - sprite.width) / 2;
            y -= (height - sprite.height) / 2;

            // AUTHENTIC EFFECT: Subtle Hand-Drawn Shake
            x += (Math.random() - 0.5) * 3;
            y += (Math.random() - 0.5) * 3;
        }

        ctx.drawImage(sprite, x, y, width, height);
    });
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

// 6. Controls
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") selectedSlot = (selectedSlot + 1) % slots.length;
    if (e.key === "ArrowLeft") selectedSlot = (selectedSlot - 1 + slots.length) % slots.length;
});

loadAssets();
