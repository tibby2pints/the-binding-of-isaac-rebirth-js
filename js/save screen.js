const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 1. Assets
const assets = {
    background: 'title bg.png',
    slot1: 'file1.png',
    slot2: 'file2.png',
    slot3: 'file3.png',
    selector: 'highlight.png'
};

const images = {};
let loadedCount = 0;
const totalAssets = Object.keys(assets).length;

// 2. Settings (Adjust SCALE to change size)
const scale = 2.0; // 2.0 = Double size
const slotY = 150; // Vertical position
const slots = [
    { id: 0, imgKey: 'slot1', x: 80 },
    { id: 1, imgKey: 'slot2', x: 360 },
    { id: 2, imgKey: 'slot3', x: 640 }
];

let selectedSlot = 0;

// 3. Load Logic
function loadAssets() {
    for (let key in assets) {
        images[key] = new Image();
        images[key].src = assets[key];
        images[key].onload = () => {
            loadedCount++;
            if (loadedCount === totalAssets) animate();
        };
        images[key].onerror = () => console.log("Missing: " + assets[key]);
    }
}

// 4. The Isaac Draw Loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disable smoothing for that "Pixel Art" look
    ctx.imageSmoothingEnabled = false;

    // Draw Background
    if (images.background) {
        ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
    }

    slots.forEach((slot, index) => {
        const sprite = images[slot.imgKey];
        if (!sprite) return;

        // Calculate scaled dimensions
        const sw = sprite.width * scale;
        const sh = sprite.height * scale;

        // Draw Save File
        ctx.drawImage(sprite, slot.x, slot.y, sw, sh);

        // Draw Shaky Highlight
        if (index === selectedSlot) {
            const shake = () => (Math.random() - 0.5) * 5;
            const hx = slot.x - (10 * scale) + shake();
            const hy = slot.y - (10 * scale) + shake();
            const hw = sw + (20 * scale);
            const hh = sh + (20 * scale);

            if (images.selector) {
                ctx.drawImage(images.selector, hx, hy, hw, hh);
            } else {
                // Red fallback if highlight.png is missing
                ctx.strokeStyle = "red";
                ctx.lineWidth = 4;
                ctx.strokeRect(hx, hy, hw, hh);
            }
        }
    });
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

// 5. Controls
window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") selectedSlot = (selectedSlot + 1) % slots.length;
    if (e.key === "ArrowLeft") selectedSlot = (selectedSlot - 1 + slots.length) % slots.length;
});

loadAssets();
